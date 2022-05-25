const Genre = require("../models/genre");
const Joi = require('joi');
const express = require('express');

const router = express.Router();

router.get("/", async (req, res) => {
    const genres = await Genre.find();
    res.send(genres)
});

router.post("/", async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const genre = new Genre({ name: req.body.name })
    const createdGenre = await genre.save();
    res.send(createdGenre)
});


router.put("/:id", async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, { new: true });
    if (!genre) return res.status(404).send("Genre with given ID was not found")

    res.send(genre);

});

router.delete("/:id", async (req, res) => { 
    const genre = await Genre.findByIdAndRemove(req.params.id)
    if (!genre) return res.status(404).send("Genre with given ID was not found")
    res.send(genre);
})

router.get("/:id", async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("Genre with given ID was not found!")
    res.send(genre)
});


function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(5).required()
    });
    return schema.validate(genre)
}

module.exports = router;