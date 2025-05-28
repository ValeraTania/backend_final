import { Request, Response } from 'express';
import MovieService from '../services/movieService.js';
import { validationResult } from 'express-validator';
import MovieModel from '../models/movieModel.js';

class MovieController {
  addMovie = async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      const image = req.files?.poster;

      if (!errors.isEmpty()) {
        res.status(422).send({ errors: errors.array() });
      }
      const newMovie = await MovieService.create(req.body, image);
      res.status(201).json(newMovie);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create movie', error });
    }
  };

  getMovies = async (req: Request, res: Response) => {
    try {
      const movies = await MovieService.getMovies();

      res.json(movies);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Can't get all movies ${error.message}`);
      }
      res.status(500).json({ error: 'Failed to get movies' });
    }
  };

  updateMovie = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const updatedMovie = await MovieService.update(id, req.body);

      res.status(201).json(updatedMovie);
      return;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Can't update the movie ${error.message}`);
      }
    }
  };

  deleteMovie = async (req: Request, res: Response) => {
    try {
      const movieToDelete = req.params.id;
      const deletedMovie = await MovieService.deleteMovie(movieToDelete);

      if (!deletedMovie) {
        res.status(404).json({ error: 'Movie not found' });
        return;
      }
      res.json(deletedMovie);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(`Can't delete movie with id ${req.params.id}: ${error.message}`);
      }
    }
  };

  search = async (req: Request, res: Response) => {
    try {
      const movies = await MovieService.search(req.query);
      res.status(200).json(movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ error: 'Failed to fetch movies' });
    }
  };
}

export default new MovieController();
