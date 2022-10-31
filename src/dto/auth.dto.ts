import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class authDto {
    @IsEmail()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}
