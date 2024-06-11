const express = require("express");
const convertStream = require("../functions/convertStream");
const router = express.Router();

router.get("/convert-stream", (req, res) => {
  const inputUrl = "rtp://239.2.2.2:2004";
  convertStream(inputUrl, res);
});

module.exports = router;
