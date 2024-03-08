const winston = require("winston");
const express = require("express");
const app = express();
const corsMiddleware = require('./middleware/cors'); 

require("./startup/config")();
require("./startup/logging")();
require("./startup/dev")(app);
require("./startup/prod")(app);

// Use the CORS middleware
app.use(corsMiddleware);

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();

const port = process.env.PORT || 3001;
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
