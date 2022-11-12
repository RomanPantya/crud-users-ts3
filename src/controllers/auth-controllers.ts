import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AuthDto } from '../dto/auth.dto';
import { UserModel } from '../models/user-model';
import { getTokens } from '../utills/getTokens';

export async function login(req:Request, res: Response, next: NextFunction) {
    const userData = req.body;

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
    if (user.isLogin === true) {
        return next(new Error('You do not need autorizaited!'));
    }

    await user.updateOne({ $set: { isLogin: true } });

    const twoTokens = getTokens({ id: user.id });

    return res.json({ twoTokens });
}
