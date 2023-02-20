const express = require("express");
const cors = require("cors");
const path = require("path");
const testRouter = require("./controllers/itsAlive");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const entriesRouter = require("./controllers/entries");
const avatarsRouter = require("./controllers/avatars");
const errorHandler = require("./utils/errorHandler");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static("build"));

app.use("/api/test", testRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/entries", entriesRouter);
app.use("/api/avatars", avatarsRouter);
app.all("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use(errorHandler);

module.exports = { app };
