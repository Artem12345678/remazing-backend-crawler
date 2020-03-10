require("dotenv").config();

const express = require("express");

const app = express();

const Database = require("./db/index");

const indexRouter = require("./routes/index");

Database.connect();

app.use("/", indexRouter);

app.listen(3000);
