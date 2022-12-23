const express = require("express");
const testRouter = require("./controllers/itsAlive");
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(express.json());

app.use("/api/test", testRouter);

app.use(errorHandler);

module.exports = { app };
