import mongoose, { Schema, Types } from 'mongoose';
import { Post } from '../dto/post.dto';

const PostSchema = new Schema<Post>({
    title: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: 'User' },
});

export const PostModel = mongoose.model('Post', PostSchema);
