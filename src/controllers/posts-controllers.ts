import { validate, isMongoId } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import {
    NextFunction, Request, Response,
} from 'express';
import { verify } from 'jsonwebtoken';
import { CreatePostDto } from '../dto/create-post.dto';
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
        return next(new Error('you must be authorizationed!'));
    }
    try {
        verify(access.split(' ')[1], process.env.JWT_SECRET!);
    } catch (error) {
        return next(new Error('You have problems with your verification'));
    }
    return res.json(await PostModel.find());
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
    const access = req.headers.authorization;
    if (!access) {
        return next(new Error('you must be authorizationed!'));
    }
    verify(access.split(' ')[1], process.env.JWT_SECRET!);

    const postId = req.params.id;
    if (isMongoId(postId) === false) {
        return next(new Error('Invalid Id'));
    }

    const post = await PostModel.findById(postId);
    return post ? res.json(post) : next(new Error('Do not have posts with this ID'));
}

export async function removePost(req: Request, res: Response, next: NextFunction) {
    const access = req.headers.authorization;
    if (!access) {
        return next(new Error('status 403: forbidden'));
    }
    let userId;

    try {
        const { id } = verify(access.split(' ')[1], process.env.JWT_SECRET!) as {id: string};
        userId = id;
    } catch (error) {
        return next(error);
    }

    const postId = req.params.id;
    isMongoId(postId);

    const post = await PostModel.findById(postId);
    if (!post) {
        return next(new Error('Do not have posts with this ID'));
    }

    if (post.userId.toString() !== userId) {
        return next(new Error('You do not have enough authority'));
    }

    post.remove();
    return res.json(`post with Id: ${postId} was removed`);
}

export async function updatePost(req: Request, res: Response, next: NextFunction) {
    const access = req.headers.authorization;

    if (!access) {
        return next(new Error('status 403: forbidden'));
    }
    let userId;

    try {
        const { id } = verify(access.split(' ')[1], process.env.JWT_SECRET!) as {id: string};
        userId = id;
    } catch (error) {
        return next(new Error('You have problems with your verification'));
    }

    const postId = req.params.id;
    isMongoId(postId);

    const validatePost = plainToInstance(UpdatePostDto, req.body);

    const error = await validate(validatePost);

    if (error.length > 0) {
        return next(new Error(error.join(' | ')));
    }

    const post = await PostModel.findById(postId);

    if (!post) {
        return next(new Error('Do not have posts with this ID'));
    }
    if (post.userId.toString() !== userId) {
        return next(new Error('You do not have enough authority'));
    }

    return res.json(await PostModel.findOneAndUpdate({ _id: postId }, validatePost, {
        new: true,
    }));
}
