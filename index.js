const mongoose = require('mongoose');
const genresRouter = require("./routes/genres");
const express = require("express");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Connected to MongoDB....."))
.catch(err => console.log(err.message))

app.use("/api/genres", genresRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));