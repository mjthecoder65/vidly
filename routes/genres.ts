import  auth from "../middleware/auth";
import admin from "../middleware/admin"
const { Genre, validateGenre } = require("../models/genre");
import express, { Router, Request, Response} from "express";
const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const genres = await Genre.find();
    res.send(genres);
});


router.post("/", auth, async (req: Request, res: Response) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const genre = new Genre({ name: req.body.name })
    const createdGenre = await genre.save();
    res.send(createdGenre)
});


router.put("/:id", async (req: Request, res: Response) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, { new: true });
    if (!genre) return res.status(404).send("Genre with given ID was not found")

    res.send(genre);

});


router.delete("/:id",[auth, admin], async (req: Request, res: Response) => { 
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if (!genre) return res.status(404).send("Genre with given ID was not found")
    res.send(genre);
});

router.get("/:id", async (req: Request, res: Response) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("Genre with given ID was not found!")
    res.send(genre)
});


export default router;