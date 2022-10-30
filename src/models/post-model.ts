import mongoose, { Schema, Types } from 'mongoose';
import { PostDto } from '../dto/post.dto';

const PostSchema = new Schema<PostDto>({
    title: { type: String, required: true, unique: true },
    summary: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: 'User' },
});

export const PostModel = mongoose.model('Post', PostSchema);
