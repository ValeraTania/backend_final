import IMovie from '../interfaces/movieInterface.js';
import MovieModel from '../models/movieModel.js';
import fileUpload from '../utils/fileUpload.js';

class MovieService {
  create = async (newMovie: IMovie, image: any) => {
    try {
      newMovie.poster = 'no-image.png';

      if (image) {
        newMovie.poster = await fileUpload.save(image, newMovie.title);
      }

      const createdMovie = await MovieModel.create(newMovie);
      return createdMovie;
    } catch (error: unknown) {
      console.error(`Error creating movie ${error}`);
      throw new Error('Failed creating movie');
    }
  };

  getMovies = async () => {
    try {
      return await MovieModel.find();
    } catch (error) {
      console.log(error);
    }
  };

  update = async (id: string, movie: IMovie) => {
    const updatedMovie = await MovieModel.findByIdAndUpdate(id, movie, { new: true });
    if (!updatedMovie) {
      throw new Error('Movie not found');
    }
    return updatedMovie;
  };

  deleteMovie = async (id: string) => {
    const movieToDelete = await MovieModel.findByIdAndDelete(id);
    if (!movieToDelete) {
      throw Error('No movie to delete');
    }
    if (movieToDelete.poster && movieToDelete.poster !== 'no-image.png') {
      console.log('poster', movieToDelete.poster);
      await fileUpload.delete(movieToDelete.poster);
    }
    return movieToDelete;
  };

  search = async (filters: any) => {
    const { page = 1, limit = 5, sortBy = 'releaseDate', name, genre, year } = filters;

    const searchBy: any = {};

    if (name) {
      searchBy.name = { $regex: name, $options: 'i' };
    }

    if (genre) {
      searchBy.genre = genre;
    }

    if (year) {
      searchBy.$expr = {
        $eq: [{ $substr: ['$releaseDate', 0, 4] }, year],
      };
    }

    const movies = await MovieModel.find(searchBy)
      .sort({ [sortBy]: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    return movies;
  };
}

export default new MovieService();
