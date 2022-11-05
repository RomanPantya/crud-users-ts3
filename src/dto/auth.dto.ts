import { OmitType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class AuthDto extends OmitType(UserDto, ['name']) {}
