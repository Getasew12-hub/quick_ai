import { GoogleGenAI } from "@google/genai";
import sql from "../config/Database.js";
import { clerkClient } from "@clerk/express";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
import { error } from "console";
import pdf from "pdf-parse/lib/pdf-parse.js"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generetArticle = async (req, res) => {
  
  try {
    const { prompt, length } = req.body;
    const { userId } = req.auth();
    const userPlan = req.plan;

    if (userPlan !== "premium" && req.free_usage >= 10) {
      return res
        .status(401)
        .json({
          sucess: false,
          message: "You reached your limit, please upgrade your plan.",
        });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a professional article about: "${prompt}".
      The article length must be: ${length}.
      Ensure the tone is engaging and informative.
      `,
    });
 
    await sql`INSERT INTO creations (content,prompt,user_id,type) VALUES (${response.text},${prompt},${userId},'article');`;
    if (userPlan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: req.free_usage + 1,
        },
      });
    }
    return res.status(200).json({ sucess: true, data: response.text });
  } catch (error) {
    console.error("error on generet aricle", error.message);
    return res.status(500).json({ sucess: false, message: error.message });
  }
};

export const BlogTitleGenerator = async (req, res) => {
  try {
    const { prompt, catagrory } = req.body;
    const { userId } = req.auth();
    const userPlan = req.plan;

    if (userPlan !== "premium" && req.free_usage >= 10) {
      return res
        .status(401)
        .json({
          sucess: false,
          message: "You reached your limit, please upgrade your plan.",
        });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Write a blog title about: "${prompt}".
      The title should be catchy and relevant to the category: "${catagrory}".
      Ensure the tone is engaging and informative.
      `,
    });

    await sql`INSERT INTO creations (content,prompt,user_id,type) VALUES (${response.text},${prompt},${userId},'title');`;
    if (userPlan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: req.free_usage + 1,
        },
      });
    }
    return res.status(200).json({ sucess: true, data: response.text });
  } catch (error) {
    console.error("error on generet aricle", error.message);
    return res.status(500).json({ sucess: false, message: error.message });
  }
};

export const ImageGenerate = async (req, res) => {
  try {
    const { prompt, style, publish } = req.body;
    const { userId } = req.auth();
    const userPlan = req.plan;

    if (userPlan !== "premium" && req.free_usage >= 10) {
      return res
        .status(401)
        .json({
          sucess: false,
          message: "You reached your limit, please upgrade your plan.",
        });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: `Generate an image of: "${prompt}".
      The image should be in the style: "${style}".
      Ensure the tone is engaging and informative.`,
    });
    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        const buffer = Buffer.from(imageData, "base64");
        fs.writeFileSync("gemini-native-image.png", buffer);
        console.log("Image saved as gemini-native-image.png");
      }
    }

    await sql`INSERT INTO creations (content,prompt,user_id,type,publish) VALUES (${response.text},${prompt},${userId},'image',${publish});`;
    if (userPlan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: req.free_usage + 1,
        },
      });
    }
    return res.status(200).json({ sucess: true, data: response.text });
  } catch (error) {
    console.error("error on image generate", error.message);
    return res.status(500).json({ sucess: false, message: error.message });
  }
};

export const ImageBackgroundRemove = async (req, res) => {
  try {
    const { image } = req.body;
    const { userId } = req.auth();
    const userPlan = req.plan;

    if (userPlan !== "premium" && req.free_usage >= 10) {
      return res
        .status(401)
        .json({
          sucess: false,
          message: "You reached your limit, please upgrade your plan.",
        });
    }
    const result = await cloudinary.uploader.upload(image, {
      eager: [
        {
          effect: "background_removal",
          format: "png",
        },
      ],
    });

    await sql`INSERT INTO creations (content,prompt,user_id,type) VALUES (${result.eager[0].secure_url},${"image"},${userId},'image');`;

    if (userPlan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: req.free_usage + 1,
        },
      });
    }
    return res
      .status(200)
      .json({ sucess: true, data: result.eager[0].secure_url });
  } catch (error) {
    console.error("error on image background remove", error.message);
    return res.status(500).json({ sucess: false, message: error.message });
  }
};

export const ImageObjectRemove = async (req, res) => {
  try {
    const { image, object } = req.body;
    const { userId } = req.auth();
    const userPlan = req.plan;

    if (userPlan !== "premium" && req.free_usage >= 10) {
      return res
        .status(401)
        .json({
          sucess: false,
          message: "You reached your limit, please upgrade your plan.",
        });
    }
    const imageClodnary = await cloudinary.uploader.upload(image, {
      transformation: [
        {
          effect: `gen_remove:prompt_${object}`,
        },
      ],
    });

    await sql`INSERT INTO creations (content,prompt,user_id,type) VALUES (${imageClodnary.secure_url},${"image"},${userId},'image');`;
    if (userPlan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: req.free_usage + 1,
        },
      });
    }
    return res
      .status(200)
      .json({ sucess: true, data: imageClodnary.secure_url });
  } catch (error) {
    console.error("error on object remove", error.message);
    return res.status(500).json({ sucess: false, message: error.message });
  }
};

export const ResumeReview = async (req, res) => {
  try {
    const pdfFile = req.file;
    const { userId } = req.auth();
    const userPlan = req.plan;
    if (!pdfFile)
      return res.status(404).json({ sucess: false, message: "No file is get" });
    if (userPlan !== "premium" && req.free_usage >= 10) {
      return res
        .status(401)
        .json({
          sucess: false,
          message: "You reached your limit, please upgrade your plan.",
        });
    }

    if (pdfFile.size > 5000000) {
      return res
        .status(401)
        .json({
          sucess: false,
          message:
            "File size is too large, please upload a file less than 5mb.",
        });
    }

    const databufer = fs.readFileSync(pdfFile.path);

    const parser = await pdf(databufer);

    const result =  parser.text;

    const prompt = `Review the following resume and provide constructive  feedback on its strength,weekness and the area of improvement.Resume content: ${result.text}`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    await sql`INSERT INTO creations (content,prompt,user_id,type) VALUES (${response.text},${"resume review"},${userId},'resume');`;
    if (userPlan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: req.free_usage + 1,
        },
      });
    }

    fs.unlink(pdfFile.path, (err) => {
      if (err) throw error;
      console.log("sucessfully file deleted");
    });
    return res.status(200).json({ sucess: true, data: response.text });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ sucess: false, message: error.message });
  }
};
