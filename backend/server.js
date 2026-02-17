import express from "express";
import env from "dotenv";
import { cloudinaryConfig } from "./config/Cloudnary.js";
import cors from "cors";

import { clerkMiddleware, requireAuth } from "@clerk/express";

import aiRouter from "./routers/ai.router.js";
import userRouter from "./routers/user.router.js";
import { Auth } from "./middlewares/auth.js";

env.config();

const app = express();
app.use(clerkMiddleware());

const port = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  }),
);

await cloudinaryConfig();
app.get("/",(req,res)=>{
    res.send("Your server is Live")
})

app.use(requireAuth());
app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);


export default app;
// app.listen(port, () => {
//   console.log("Your server running on port:" + port);
// });
