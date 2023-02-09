import express from "express";
import auth from "../middleware/auth.middleware.js"
import { getAllActors, getActor, createActor, updateActor, deleteActor } from "../controllers/actor.controller.js";

const router = express.Router();

router.get("/", auth, getAllActors);
router.get("/:id", auth, getActor);
router.post("/", auth, createActor);
router.put("/:id", auth, updateActor);
router.delete("/:id", auth, deleteActor);

export default router;