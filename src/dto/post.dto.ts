import {
    IsNotEmpty, IsString, Length,
} from 'class-validator';
import { Types } from 'mongoose';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  title!: String;

  @Length(10)
  summary!: String;

  userId!: Types.ObjectId;
}
