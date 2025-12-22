import express from "express";
import {getVideos} from '../controlls/ShowingContent.js'

const router = express.Router();

// Fetch all videos
router.get("/all", getVideos);


export default router;
