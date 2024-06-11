const express = require("express");
const multer = require("multer");
const router = express.Router();
const extractFrames = require("../functions/extractFrames");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // specify the folder to store uploaded files
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname), // generate a unique filename
});

// Create a multer instance with the storage configuration
const upload = multer({ storage: storage });

// Handle form data and file upload
router.post("/extractframes", upload.single("video"), async (req, res) => {
  const { fps, frames, from, to } = req.body;

  if (!fps || isNaN(fps)) {
    return res
      .status(400)
      .json({ message: "fps is required, e.g., 10 for 10 frames/second" });
  }
  if (!req.file) {
    return res.status(400).json({ message: "video file is required" });
  }
  if (!frames || isNaN(frames)) {
    return res
      .status(400)
      .json({ message: "frames are required, e.g., 10 or 100, to extract" });
  }
  if (!from || isNaN(from)) {
    return res.status(400).json({ message: "from is required in seconds" });
  }
  if (!to || isNaN(to)) {
    return res.status(400).json({ message: "to is required in seconds" });
  }

  try {
    const result = await extractFrames(req.file.path, fps, frames, from, to);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = router;
