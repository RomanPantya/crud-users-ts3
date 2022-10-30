import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { Post, PostModel } from '../models/post-model';

export async function createPost(req: Request, res: Response, next: NextFunction) {
    const validatePost = new Post();

    validatePost.title = req.body.title;
    validatePost.summary = req.body.summary;

    const error = await validate(validatePost);

    if (error.length > 0) {
        return next(new Error(error.join(' | ')));
    }

    const post = new PostModel(validatePost);

    const created = await post.save();
    return res.json(created);
}
