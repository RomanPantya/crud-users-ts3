import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { sign } from 'jsonwebtoken';
import { AuthDto } from '../dto/auth.dto';
import { UserModel } from '../models/user-model';

export async function login(req:Request, res: Response, next: NextFunction) {
    const validateAuth = new AuthDto();

    validateAuth.email = req.body.email;
    validateAuth.password = req.body.password;

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

    const access = sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '4h' });

    return res.json({ access });
}
