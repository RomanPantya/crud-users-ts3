import mongoose, { Schema } from 'mongoose';
import { PostDto } from '../dto/post.dto';

const PostSchema = new Schema<PostDto>({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

PostSchema.index({ title: 1 }, { unique: true });

export const PostModel = mongoose.model('Post', PostSchema);
