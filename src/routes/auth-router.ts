import { Router } from 'express';
import { loginOrRefresh } from '../controllers/auth_refresh-controllers';

export const authRouter = Router()
    .post('/login', loginOrRefresh);
