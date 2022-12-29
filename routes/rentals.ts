const { Rental, validateRental } = require("../models/rental");
const { Movie } = require("../models/movie");
import { Customer } from "../models/customer";
const mongoose = require("mongoose");
import express, { Request, Response, Router } from "express";
const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    const rentals = await Rental.find().sort("-dateOut");
    res.send(rentals)
});

router.post("/", async (req: Request, res: Response) => {
    const { error } = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message)

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send("Invalid customer.");

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(404).send("Invalid Movie.")

    if (movie.numberInStock == 0) return res.status(400).send("Movie not in stock.");

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    // TODO:
    // WE NEED TRANSACTION HERE. NOSQL HAS NO TRANSACTION
    // TWO PHASE COMMIT: MONGO DB
    // NPM PACKAGE THAT SIMULATE TRANSACTION IN MONGO
    // ATOMIC: THEY SHOULD EITHER COMPLETE SUCCESSFULLY OR ROLLBACK.

    rental = await rental.save();
    
    movie.numberInStock--;
    await movie.save();
    
    res.send(rental)
});

router.delete("/:id", async (req: Request, res: Response) => { 
    const rental = await Rental.findByIdAndRemove(req.params.id)
    if (!rental) return res.status(404).send("Rental with given ID was not found")
    res.send(rental);
})

router.get("/:id", async (req: Request, res: Response) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send("Rental with given ID was not found!")
    res.send(rental)
});

export default router;