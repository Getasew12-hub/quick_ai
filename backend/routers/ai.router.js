import express from "express"
import { BlogTitleGenerator, generetArticle, ImageBackgroundRemove, ImageGenerate, ImageObjectRemove, ResumeReview } from "../controllers/ai.controller.js";
import { Auth } from "../middlewares/auth.js";
import { upload } from "../config/multer.js";


const router=express.Router();


router.post("/generate-article",Auth, generetArticle);
router.post("/generate-title",Auth, BlogTitleGenerator);
router.post("/generate-image",Auth, ImageGenerate);
router.post("/review-resume",Auth, ResumeReview);
router.post("/image-background-remove",Auth, ImageBackgroundRemove);
router.post("/image-object-remove",Auth,ImageObjectRemove );
router.post("/resume-review",upload.single("resume"),Auth, ResumeReview);

export default router