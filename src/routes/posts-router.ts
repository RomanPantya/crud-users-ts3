import { Router } from 'express';
import { createPost } from '../controllers/posts-controllers';

export const postsRouter = Router()
    .post('/', createPost);
