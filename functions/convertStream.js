const ffmpegPath = "C:/ffmpeg/bin/ffmpeg.exe";
const ffmpeg = require("fluent-ffmpeg");

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

function convertStream(inputUrl, res) {
  ffmpeg(inputUrl)
    .outputOptions("-c:v libx264") // Specify H.264 codec for video
    .outputOptions("-profile:v high") // Specify the profile for H.264
    .outputOptions("-level:v 3.1") // Specify the level for H.264
    .outputOptions("-c:a aac") // Specify AAC codec for audio
    .outputOptions("-profile:a aac_low") // Specify the profile for AAC
    .outputOptions("-hls_time 11")
    .outputOptions("-hls_list_size 6")
    .outputOptions("-start_number 1")
    .output("channel/live.m3u8")
    .on("start", function (commandLine) {
      console.log("FFmpeg process started:", commandLine);
      res.status(200).send("Stream conversion started");
    })
    .on("error", function (err, stdout, stderr) {
      console.error("Error:", err.message);
      res.status(500).send("Error converting stream");
    })
    .on("end", function () {
      console.log("Conversion finished");
    })
    .run();
}

module.exports = convertStream;
