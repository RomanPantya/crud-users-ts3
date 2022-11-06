import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

type ImplementConstraint = Partial<Record<keyof Omit<CreatePostDto, 'userId'>, any>>;

export class UpdatePostDto implements ImplementConstraint {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  summary?: string;
}
