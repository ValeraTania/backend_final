import { Router } from 'express';
import { check } from 'express-validator';
import userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
//register user
router.post(
  '/register',
  [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isStrongPassword().withMessage('Password should be strong'),
    check('username').isLength({ min: 2, max: 100 }).withMessage('Name should have at least 2 characters'),
  ],
  userController.register,
);

//login
router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isStrongPassword().withMessage('Invalid password'),
  ],
  userController.login,
);

//get all users
router.get('/users', authMiddleware(['admin']), userController.getUsers);

//update user
router.put('/user/:id', authMiddleware(['admin']), userController.updateUser);

//deletes a user
router.delete('/user/:id', authMiddleware(['admin']), userController.deleteUser);

export default router;
