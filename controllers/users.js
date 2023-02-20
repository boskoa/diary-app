const router = require("express").Router();
const { User, Entry } = require("../models");
const bcrypt = require("bcrypt");
const { tokenExtractor } = require("../utils/tokenExtractor");

router.get("/", async (req, res, next) => {
  let where = {};
  let order = [];

  if (req.query.search) {
    where = {
      name: req.query.search,
    };
  }

  if (req.query.order) {
    order.push(["name", req.query.order]);
  }

  try {
    const users = await User.findAll({
      where,
      order,
      attributes: {
        exclude: ["passwordHash"],
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", tokenExtractor, async (req, res, next) => {
  if (isNaN(req.params.id)) {
    return res.status(401).json({ error: "Not a valid user ID" });
  }

  try {
    const user = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ["passwordHash"],
      },
      include: {
        model: Entry,
      },
    });

    if (!user) {
      return res.status(401).json({ error: "No such user" });
    }

    if (user.id !== req.decodedToken.id) {
      return res.status(401).json({ error: "Not authorized" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, passwordHash });
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: "Invalid credentials" });
    next(error);
  }
});

router.put("/:id", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.params.id, {
    attributes: {
      exclude: ["passwordHash"],
    },
  });

  if (!user) {
    return res.status(401).json({ error: "No such user" });
  }

  const changer = await User.findByPk(req.decodedToken.id);

  if (changer.id !== user.id) {
    return res.status(401).json({ error: "You are not authorized" });
  }

  const newValues = { ...req.body };

  if (newValues.password) {
    const passwordCorrect = await bcrypt.compare(
      req.body.password,
      changer.passwordHash
    );

    if (!passwordCorrect) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const passwordHash = await bcrypt.hash(newValues.newPassword, 10);
    delete newValues.password;
    delete newValues.newPassword;
    newValues.passwordHash = passwordHash;
  }

  try {
    user.set({ ...newValues });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
