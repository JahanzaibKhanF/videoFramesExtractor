const ffmpegPath = "C:/ffmpeg/bin/ffmpeg.exe";
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");

const baseUrl = "http://192.168.18.67:3009/"; // Base URL for the paths

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

async function extractFrames(video, fps, frames, from, to) {
  const baseOutputDir = "frames";
  const uniqueId = Date.now(); // Use timestamp for unique subdirectory
  const outputDir = path.join(baseOutputDir, `extraction-${uniqueId}`);

  // Create the unique subdirectory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const framePattern = "frame%03d.jpg";
  const outputPattern = path.join(outputDir, framePattern);

  return new Promise((resolve, reject) => {
    ffmpeg(video)
      .outputOptions(`-r ${fps}`)
      .outputOptions(`-vframes ${frames}`)
      .output(outputPattern)
      .on("start", function (commandLine) {
        console.log("FFmpeg process started:", commandLine);
      })
      .on("error", function (err, stdout, stderr) {
        console.error("Error:", err.message);
        reject(`Error: ${err.message}`);
      })
      .on("end", function () {
        console.log("Frame extraction finished");

        // Collect the paths of the extracted frames
        const framePaths = [];
        for (let i = 1; i <= frames; i++) {
          const framePath = path.join(
            outputDir,
            `frame${i.toString().padStart(3, "0")}.jpg`
          );
          if (fs.existsSync(framePath)) {
            framePaths.push(baseUrl + framePath);
          }
        }

        resolve({
          message: "Frame extraction finished",
          success: true,
          frames: framePaths,
        });

        // Delete the video file after resolving the promise
        fs.unlink(video, (err) => {
          if (err) {
            console.error("Error deleting video file:", err);
          } else {
            console.log("Video file deleted");
          }
        });
      })
      .run();
  });
}

module.exports = extractFrames;
