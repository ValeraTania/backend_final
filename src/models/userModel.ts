import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Role } from '../interfaces/userInterface.js';


const UserSchema = new mongoose.Schema({
   _id: {
    type: String,
    default: uuidv4,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, enum: [Role.USER, Role.ADMIN], default: 'user' },
});

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
