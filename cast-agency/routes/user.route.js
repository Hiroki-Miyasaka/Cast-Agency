// TODO: PUT update user information
// TODO: GET /me to get authenticated user information

import express from "express";
import auth from "../middleware/auth.middleware.js";
import { getMe, updateInformation } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", auth, getMe);
router.put("/update", auth, updateInformation);

export default router;