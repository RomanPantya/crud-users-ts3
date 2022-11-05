import mongoose, { Schema } from 'mongoose';
import { UserDto } from '../dto/user.dto';

export const UserSchema = new Schema<UserDto>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const UserModel = mongoose.model('User', UserSchema);
