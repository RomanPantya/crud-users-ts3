import {
    IsMongoId, IsNotEmpty, IsString, Length,
} from 'class-validator';
import { ObjectId } from 'mongoose';

export class Post {
  @IsString()
  @IsNotEmpty()
  title!: String;

  @Length(10)
  summary!: String;

  @IsMongoId()
  userId!: ObjectId;
}
