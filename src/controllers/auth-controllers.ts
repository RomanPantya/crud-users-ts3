import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
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
        return next(new Error('email is not valid!'));
    }
    return res.json(user);
}
