import Video from "../model/video.js";

export const uploadVideo = async (req, res) => {
  const { thumbnail, url, core, channelName } = req.body;

  try {
    // Validation
    if (!thumbnail || !url || !core || !channelName) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Create new video
    const newVideo = new Video({
      thumbnail,
      url,
      core,
      channelName,
    });

    await newVideo.save();

    return res.status(201).json({
      success: true,
      message: "Video uploaded successfully",
      video: newVideo,
    });
  } catch (error) {
    console.error("❌ Error in uploading:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const deleteVideo = async (req, res) => {
  try {
    const Vid = req.params.id;
    console.log(Vid);
    
    const VDelete = await Video.findByIdAndDelete(Vid);

    if (!VDelete) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json({ message: "Video deleted successfully" });

  } catch (err) {
    console.log("Error deleting video", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateVideo =async( req,res)=>{
  try{
  const {id} =req.params
  const updates=req.body;
  const updatedItem = await Video.findByIdAndUpdate(
      id,
      updates,
      { new: true }                // returns updated doc instead of old one
    );
    console.log(updatedItem);
    

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({
      message: "Item updated successfully",
      item: updatedItem
    });
  }catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
}
