require("dotenv").config();

const port = process.env.PORT || 3000;

const express = require("express");

const app = express();

const Database = require("./db/index");

const indexRouter = require("./routes/index");

Database.connect().then(() => {
  app.use("/", indexRouter);
  app.listen(port);
});
