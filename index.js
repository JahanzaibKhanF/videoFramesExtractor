const express = require("express");
const path = require("path");
const cors = require("cors");

const calculateRoute = require("./routes/calculateRoute");
const convertStreamRoute = require("./routes/convertStreamRoute");
const extractFramesRoute = require("./routes/extractFramesRoute");

const app = express();

// Enable CORS
app.use(cors());

// Serve files as static files
app.use(express.static(path.join(__dirname, "/")));

// Use the routes
app.use(calculateRoute);
app.use(convertStreamRoute);
app.use(extractFramesRoute);

// Start the Express server
const PORT = 3009;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
