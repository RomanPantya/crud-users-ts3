import mongoose, { Schema } from 'mongoose';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name!: String;

  @IsEmail()
  email!: String;

  @IsString()
  @IsNotEmpty()
  password!: String;
}

const UserSchema = new Schema<UserDto>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const UserModel = mongoose.model('User', UserSchema);
