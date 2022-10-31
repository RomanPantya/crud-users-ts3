import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class AuthDto {
    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}
