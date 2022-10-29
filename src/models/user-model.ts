import mongoose, { Schema } from 'mongoose';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class User {
  @IsString()
  @IsNotEmpty()
  name!: String;

  @IsEmail()
  email!: String;

  @IsString()
  @IsNotEmpty()
  password!: String;
}

const UserSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

export const UserModel = mongoose.model('User', UserSchema);
