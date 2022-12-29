import dotenv from "dotenv"
import express, {Express} from "express";
const app: Express = express();

dotenv.config()

require('./startup/logging')();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config");
require('./startup/validation');
require('./startup/prod')(app);

const PORT = process.env.PORT || 53161
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));