import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { UserDto, UserModel } from '../models/user-model';

export async function createUser(req: Request, res: Response, next: NextFunction) {
    const validateUser = new UserDto();

    validateUser.name = req.body.name;
    validateUser.email = req.body.email;
    validateUser.password = req.body.password;

    const error = await validate(validateUser);

    if (error.length > 0) {
        return next(new Error(error.join(' | ')));
    }

    const user = new UserModel(validateUser);

    const created = await user.save();
    return res.json(created);
}
