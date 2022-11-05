import { validate } from 'class-validator';
import {
    NextFunction, Request, Response,
} from 'express';
import { verify } from 'jsonwebtoken';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostId } from '../dto/postId.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostModel } from '../models/post-model';

export async function createPost(req: Request, res: Response, next: NextFunction) {
    const access = req.headers.authorization;
    if (!access) {
        return next(new Error('status 403: forbidden'));
    }
    const { id } = verify(access.split(' ')[1], process.env.JWT_SECRET!) as { id: string };
    const validatePost = new CreatePostDto();

    validatePost.title = req.body.title;
    validatePost.summary = req.body.summary;
    validatePost.userId = id;

    const error = await validate(validatePost);

    if (error.length > 0) {
        return next(new Error(error.join(' | ')));
    }

    const post = new PostModel(validatePost);

    try {
        const created = await post.save();
        return res.json(created);
    } catch (mongoErr) {
        return next(mongoErr);
    }
}

export async function getAllPosts(req: Request, res: Response, next: NextFunction) {
    const access = req.headers.authorization;
    if (!access) {
        return next(new Error('status 403: forbidden'));
    }
    verify(access.split(' ')[1], process.env.JWT_SECRET!);

    return res.json(await PostModel.find());
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
    const access = req.headers.authorization;
    if (!access) {
        return next(new Error('status 403: forbidden'));
    }
    verify(access.split(' ')[1], process.env.JWT_SECRET!);
    const postId = new PostId();
    postId.id = req.params.id;

    const error = await validate(postId);
    if (error.length > 0) {
        return next(error);
    }

    const post = await PostModel.findById(postId.id);
    return post ? res.json(post) : next(new Error('Do not have posts with this ID'));
}

export async function removePost(req: Request, res: Response) {
    // const access = req.headers.authorization;
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
    return res.json(await PostModel.findByIdAndUpdate(postId, validatePost, { new: true }));
}
