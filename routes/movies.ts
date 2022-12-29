import  auth from '../middleware/auth';
import { Movie, validateMovie } from "../models/movie";
import { Genre } from "../models/genre";
import express, {Request, Response, Router} from 'express';

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const movies = await Movie.find().sort("name");
    res.send(movies)
});

router.post("/", auth, async (req: Request, res: Response) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid genre Id...");
    
    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    await movie.save();
    res.send(movie)
});

router.put("/:id", auth,  async (req: Request, res: Response) => {
    const { error } = validateMovie(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');
  
    const movie = await Movie.findByIdAndUpdate(req.params.id,
      { 
        title: req.body.title,
        genre: {
          _id: genre._id,
          name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
      }, { new: true });
  
    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    
    res.send(movie);

});

router.delete("/:id", async (req: Request, res: Response) => { 
    const movie = await Movie.findByIdAndRemove(req.params.id)
    if (!movie) return res.status(404).send("The Movie with given ID was not found")
    res.send(movie);
})

router.get("/:id", auth, async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("The Movie with given ID was not found!")
    res.send(movie)
});

export default router;

