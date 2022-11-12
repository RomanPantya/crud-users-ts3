import { Router } from 'express';
import { login } from '../controllers/auth-controllers';

export const authRouter = Router()
    .post('/login', login);
