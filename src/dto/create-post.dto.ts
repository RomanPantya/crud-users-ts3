import { OmitType } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { PostDto } from './post.dto';

export class CreatePostDto extends OmitType(PostDto, ['userId']) {
  @IsMongoId()
  userId!: string;
}
