import { Router } from 'express';
import { createUser } from '../controllers/user-controllers';

export const usersRouter = Router()
    .post('/', createUser);
