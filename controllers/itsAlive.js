const router = require("express").Router();

const test = "It's alive!";

router.get("/", (req, res) => {
  res.status(200).json(test);
});

module.exports = router;
