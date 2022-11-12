import { NextFunction, Request, Response } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { verify } from 'jsonwebtoken';
import { RefreshDto } from '../dto/refresh.dto';
import { UserModel } from '../models/user-model';
import { getTokens } from '../utills/getTokens';

export async function refresh(req: Request, res: Response, next: NextFunction) {
    const userData = req.body;

    const validateUserData = plainToInstance(RefreshDto, userData);

    const error = await validate(validateUserData);
    if (error.length > 0) {
        return next(new Error(error.join(' | ')));
    }

    let userId;
    try {
        const { id } = verify(validateUserData.refresh, process.env.JWT_SECRET_REF!) as {id: string};
        userId = id;
    } catch (err) {
        return next(err);
    }

    const user = await UserModel.findById(userId);
    if (!user) {
        return next(new Error('you must be authorizationed!'));
    }
    if (user.email !== validateUserData.email) {
        return next(new Error('error 403: email is not valid!'));
    }
    if (user.password !== validateUserData.password) {
        return next(new Error('error 403: password is not valid!'));
    }

    const twoTokens = getTokens({ id: user.id });

    return res.json({ twoTokens });
}
