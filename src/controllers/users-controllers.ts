import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { UserModel } from '../models/user-model';
import { UserDto } from '../dto/user.dto';

export async function createUser(req: Request, res: Response, next: NextFunction) {
    const userData = req.body;

    const validateUser = plainToInstance(UserDto, userData);

    const error = await validate(validateUser);
    if (error.length > 0) {
        return next(new Error(error.join(' | ')));
    }

    const user = new UserModel(validateUser);

    const created = await user.save();
    return res.json(created);
}
