import { IsMongoId } from 'class-validator';

export class PostId {
  @IsMongoId()
  id!: string;
}
