const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET } = require("../utils/config");

const router = require("express").Router();

router.post("/", async (req, res, next) => {
  if (req.body.username === "" || req.body.password === "") {
    return res.status(401).json({ error: "No credentials entered" });
  }

  const user = await User.findOne({ where: { username: req.body.username } });
  if (!user) {
    return res.status(401).json({ error: "That username is not registered" });
  }

  try {
    const passwordCorrect = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );

    if (!passwordCorrect) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const userForToken = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(userForToken, SECRET);
    res.status(200).send({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
