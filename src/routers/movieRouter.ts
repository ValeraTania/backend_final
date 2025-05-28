import { Router } from 'express';
import movieController from '../controllers/movieController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

//get all movies
router.get('/', authMiddleware(['user', 'admin']), movieController.getMovies);

//search
router.get('/search', authMiddleware(['user', 'admin']), movieController.search);

//create a movie
router.post('/', authMiddleware(['admin']), movieController.addMovie);

//delete a movie
router.delete('/:id', authMiddleware(['admin']), movieController.deleteMovie);

//update a movie
router.put('/:id', authMiddleware(['admin']), movieController.updateMovie);

export default router;
