import {userRegister,userLogin } from '../controlls/AuthController.js'

import express from "express";


const router = express.Router();

// Route: POST /api/auth/register
router.post("/register", userRegister);
router.post("/login", userLogin );

// Route: POST /api/auth/login
// router.post("/login", userLogin);

export default router;
