import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { sign, verify } from 'jsonwebtoken';
import { AuthDto } from '../dto/auth.dto';
import { UserModel } from '../models/user-model';

export async function loginOrRefresh(req:Request, res: Response, next: NextFunction) {
    const userData = req.body;

    const access = req.headers.authorization;

    const validateAuth = plainToInstance(AuthDto, userData);

    const error = await validate(validateAuth);
    if (error.length > 0) {
        return next(new Error(error.join(' | ')));
    }

    const user = await UserModel.findOne({ email: validateAuth.email });
    if (!user) {
        return next(new Error('error 403: email is not valid!'));
    }
    if (user.password !== validateAuth.password) {
        return next(new Error('error 403: password is not valid!'));
    }

    if (access) {
        try {
            verify(access.split(' ')[1], process.env.JWT_SECRET_REF!);
        } catch (err) {
            return next(err);
        }
    }

    const twoTokens = {
        access: sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '2h' }),
        refresh: sign({ id: user.id }, process.env.JWT_SECRET_REF!, { expiresIn: '2d' }),
    };

    return res.json({ twoTokens });
}
