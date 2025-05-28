import IUser from '../interfaces/userInterface.js';
import tokenService from '../utils/tokenService.js';
import bcrypt from 'bcrypt';
import UserModel from '../models/userModel.js';

class userService {
  register = async (newUser: IUser) => {
    try {
      const existingUser = await UserModel.findOne({ email: newUser.email });
      if (existingUser) return null;

      newUser.password = await bcrypt.hash(newUser.password, 7);

      const createdUser = await UserModel.create(newUser);
      const accessToken = tokenService.generateAccessToken(createdUser);

      return { createdUser: createdUser, accessToken: accessToken };
    } catch (error: unknown) {
      console.error(`Error creating user ${error}`);
      throw new Error('Failed creating user');
    }
  };

  login = async (
    email: string,
    password: string,
  ): Promise<{
    user: IUser;
    accessToken: string;
  } | null> => {
    try {
      const foundUser: IUser | null = await UserModel.findOne({ email });
      if (!foundUser) throw new Error(`Email doesn't exists`);

      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (!isMatch) throw new Error(`Password doesn't match`);

      const accessToken = tokenService.generateAccessToken(foundUser);

      return { user: foundUser, accessToken: accessToken };
    } catch (error) {
      console.error(`Error logging in user: ${error}`);
      throw new Error('Failed to login user');
    }
  };

  getUsers = async () => {
    try {
      return await UserModel.find();
    } catch (error: unknown) {
      console.error(`Error getting users ${error}`);
      throw new Error('Failed getting users');
    }
  };

  

  update = async (id: string, user: IUser) => {
    const updatedProduct = await UserModel.findByIdAndUpdate(id, user, { new: true });
    if (!updatedProduct) {
      throw new Error('User not found');
    }
    return updatedProduct;
  };

  delete = async (id: string) => {
    const userToDelete = await UserModel.findByIdAndDelete(id);
    if (!userToDelete) {
      throw Error('No user to delete');
    }

    return userToDelete;
  };
}

export default new userService();
