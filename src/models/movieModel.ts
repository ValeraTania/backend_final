import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releaseDate: { type: String, require: true },
  trailerLink: { type: String, required: true },
  poster: { type: String, default: 'no-image.png' },
  genres: { type: Array, required: true },
});

const MovieModel = mongoose.model('Movie', MovieSchema);
export default MovieModel;
