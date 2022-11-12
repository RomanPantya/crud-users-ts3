import { IsNotEmpty, IsString } from 'class-validator';
import { AuthDto } from './auth.dto';

export class RefreshDto extends AuthDto {
  @IsString()
  @IsNotEmpty()
  refresh!: string;
}
