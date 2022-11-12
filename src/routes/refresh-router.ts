import { Router } from 'express';
import { refresh } from '../controllers/refresh-controllers';

export const refreshRouter = Router()
    .post('/', refresh);
