import { Router } from 'express';
import {
    createPost, getAllPosts, getOne, removePost, updatePost,
} from '../controllers/posts-controllers';

export const postsRouter = Router();

postsRouter.post('/', createPost);

postsRouter.get('/', getAllPosts);

postsRouter.get('/:id', getOne);

postsRouter.delete('/:id', removePost);

postsRouter.put('/:id', updatePost);
