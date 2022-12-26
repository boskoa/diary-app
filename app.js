const express = require("express");
const testRouter = require("./controllers/itsAlive");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const entriesRouter = require("./controllers/entries");
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(express.json());

app.use("/api/test", testRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/entries", entriesRouter);

app.use(errorHandler);

module.exports = { app };
