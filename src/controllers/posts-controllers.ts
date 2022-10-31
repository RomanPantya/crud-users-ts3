import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { PostModel } from '../models/post-model';
import { PostDto } from '../dto/post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

export async function createPost(req: Request, res: Response, next: NextFunction) {
    const validatePost = new PostDto();

    validatePost.title = req.body.title;
    validatePost.summary = req.body.summary;
    validatePost.userId = req.body.userId;

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

export async function updatePost(req: Request, res: Response, next: NextFunction) {
    const validatePost = new UpdatePostDto();

    validatePost.title = req.body.title;
    validatePost.summary = req.body.summary;

    const error = await validate(validatePost);

    if (error.length > 0) {
        return next(new Error(error.join(' | ')));
    }

    const postId = req.params.id;
    return res.json(await PostModel.findByIdAndUpdate(postId, validatePost));
}
