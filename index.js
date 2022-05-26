const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const genresRouter = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals")
const mongoose = require('mongoose');
const express = require("express");


const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to MongoDB....."))
.catch(err => console.log(err.message))

app.use("/api/genres", genresRouter);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));