import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import userService from '../services/userService.js';

class UserController {
  // add user
  register = async (req: Request, resp: Response): Promise<void> => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        resp.status(422).json({ errors: errors.array() });
        return;
      }

      const createdUserWithToken = await userService.register(req.body);
      if (!createdUserWithToken) {
        resp.status(404).json('User already exists');
        return;
      } else {
        resp.status(201).send(createdUserWithToken);
        return;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Can't create a new user: ${error.message}`);
      }
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
      }
      const foundUserWithToken = await userService.login(email, password);
      if (!foundUserWithToken) {
        res.status(404).json({ error: 'Failed login' });
      }
      res.status(200).json(foundUserWithToken);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Can't login a user:  ${error.message}`);
      }
      res.status(500).json("Can't login a user");
    }
  };

  //get all users
  getUsers = async (req: Request, res: Response) : Promise<any>=> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
       return;
      }
      const usersList = await userService.getUsers();
     return res.status(200).json(usersList);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Can't get the list of users: ${error.message}`);
        return;
      }
    }
  };

  //update
  updateUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedUser = await userService.update(id, req.body);

      res.status(201).json(updatedUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Can't update the user ${error.message}`);
      }
      res.status(500).json({ error: 'Failed to update user' });
    }
  };

  //deletes a user
  deleteUser = async (req: Request, res: Response) => {
    try {
      const userToDelete = req.params.id;
      // const token = req.headers.authorization || '';
      const deletedUser = await userService.delete(userToDelete);

      if (!deletedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.json(deletedUser);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Can't delete user with id ${req.params.id}: ${error.message}`);
      }
    }
  };
}

export default new UserController();
