import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { PostModel } from '../models/post-model';
import { Post } from '../dto/post.dto';

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

export async function getAllPosts(req: Request, res: Response) {
    const allPosts = await PostModel.find();
    res.json(allPosts);
}

export async function getOne(req: Request, res: Response) {
    const post = await PostModel.findById(req.params.id);
    res.json(post);
}

export async function removePost(req: Request, res: Response) {
    await PostModel.findByIdAndRemove(req.params.id);
    res.json('ok');
}

export async function updatePost(req: Request, res: Response) {
    const data = req.body;
    const postId = req.params.id;
    await PostModel.findByIdAndUpdate(postId, data);
    res.json(await PostModel.findById(postId));
}
