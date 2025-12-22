// routes/adminRouter.js
import express from "express";
import { uploadVideo,deleteVideo,updateVideo} from "../controlls/AdminController.js";
const router = express.Router();

router.get("/dashboard", (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.post('/upload',uploadVideo)
router.delete("/delete/:id", deleteVideo);
router.put("/update/:id", updateVideo);
export default router;
