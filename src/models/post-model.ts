import mongoose, { Schema } from 'mongoose';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class Post {
  @IsString()
  @IsNotEmpty()
  title!: String;

  @Length(10)
  summary!: String;
}

const PostSchema = new Schema<Post>({
    title: { type: String, required: true },
    summary: { type: String, required: true },
});

export const PostModel = mongoose.model('Post', PostSchema);
