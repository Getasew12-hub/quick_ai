import express from "express";
import { getUserCreations, likeToogle, publishCreations } from "../controllers/user.controller.js";
import { Auth } from "../middlewares/auth.js";

const router = express.Router();
router.get("/creation",Auth,getUserCreations)
router.get("/publish",publishCreations)
router.post('/like-toggle/:id',likeToogle)




export default router