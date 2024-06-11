const express = require("express");
const calculate = require("../functions/calculate");
const router = express.Router();

router.get("/calculate", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  if (!a || !b) {
    res.status(400).send({ error: "Missing parameters" });
    return;
  }
  const result = calculate(a, b);
  res.send(result);
});

module.exports = router;
