import { Router } from 'express';
import { createUser } from '../controllers/users-controllers';

export const usersRouter = Router()
    .post('/', createUser);
