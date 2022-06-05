const express = require("express");
const app = express();

require('./startup/logging')();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config");
require('./startup/validation');
require('./startup/prod')(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));