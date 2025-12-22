import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  core: String,
  url: String,
  thumbnail: String,
  channelName:String,
});

export default mongoose.model("Video", videoSchema);
