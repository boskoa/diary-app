const { User, Entry } = require("../models");
const { tokenExtractor } = require("../utils/tokenExtractor");
const { Op } = require("sequelize");

const router = require("express").Router();

router.get("/", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id, {
    attributes: {
      exclude: ["passwordHash"],
    },
  });

  if (!user) {
    return res.status(401).json({ error: "Not authorized" });
  }

  let where = { userId: user.id };

  if (req.query.date) {
    const dateStart = new Date(req.query.date).setHours(0, 0, 0);
    const dateEnd = new Date(req.query.date).setHours(23, 59, 59);
    where.createdAt = {
      [Op.gt]: dateStart,
      [Op.lt]: dateEnd,
    };
  }

  try {
    const entries = await Entry.findAll({ where });
    res.status(200).json(entries);
  } catch (error) {
    next(error);
  }
});

router.post("/", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);

  if (!user) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    const newEntryData = { ...req.body };

    if (!(newEntryData.title && newEntryData.content)) {
      return res.status(401).json({ error: "Missing title or content" });
    }

    const newEntry = await Entry.create({ ...newEntryData, userId: user.id });
    res.status(200).json(newEntry);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  const entry = await Entry.findByPk(req.params.id);

  if (!entry) {
    return res.status(401).json({ error: "No entry with that ID" });
  }

  if (!user || user.id !== entry.userId) {
    return res.status(401).json({ error: "Not authorized" });
  }

  const newEntryData = { ...req.body };

  if (!(newEntryData.title || newEntryData.content)) {
    return res.status(401).json({ error: "Nothing to change" });
  }

  try {
    entry.set({ ...newEntryData });
    await entry.save();
    res.status(200).json(entry);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", tokenExtractor, async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  const entry = await Entry.findByPk(req.params.id);

  if (!entry) {
    return res.status(401).json({ error: "No entry with that ID" });
  }

  if (!user || user.id !== entry.userId) {
    return res.status(401).json({ error: "Not authorized" });
  }

  try {
    await entry.destroy();
    res.status(200).json({ id: Number(req.params.id) });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
