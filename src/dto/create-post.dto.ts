import { OmitType } from '@nestjs/swagger';
import { PostDto } from './post.dto';

export class CreatePostDto extends OmitType(PostDto, ['userId']) {

}
