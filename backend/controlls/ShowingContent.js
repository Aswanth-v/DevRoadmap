// videoController.js
import Video from "../model/video.js";

export const getVideos = async (req, res) => {
  
  try {
    const videos = await Video.find().sort({ createdAt: -1 }); // latest first
    return res.status(200).json({
      success: true,
      videos,
      
    });
  } catch (error) {
    console.error("❌ Error fetching videos:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


