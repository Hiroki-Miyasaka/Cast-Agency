import express from "express";
import auth from "../middleware/auth.middleware.js";

import { createAgency, getAgencies, getAgency, updateAgency, deleteAgency } from "../controllers/castagency.controller.js";

const router = express.Router();

router.post("/", auth, createAgency);

router.get("/", auth, getAgencies)

router.get("/:id", auth, getAgency);

router.put("/:id", auth, updateAgency);

router.delete("/:id", auth, deleteAgency);

export default router;