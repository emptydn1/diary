const { Router } = require("express");
const router = Router();
const logEntrys = require("../models/LogEntry.js");

router.get("/", async (req, res) => {
  try {
    const entries = await logEntrys.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const logEntry = new logEntrys(req.body);
    const createdEntry = await logEntry.save();
    console.log("add data successful");
    res.json(createdEntry);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
