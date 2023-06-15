import express from "express";
import { register, login } from "../controllers/freelancer/freelancer.auth.js";
import { freelancerAuthMiddleware } from "../middlewares/freelancerAuthToken.js";
import {
  contentPost,
  getPost,
  likePost,
} from "../controllers/freelancer/freelancer.content.js";
import { updateFreelancerInformation } from "../controllers/freelancer/freelancer.information.js";
import { upload } from "../middlewares/upload.js";
import { applyJob, getJob } from "../controllers/freelancer/freelancer.jobs.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch(
  "/information",
  freelancerAuthMiddleware,
  upload.single("profilePhoto"),
  updateFreelancerInformation
);
router.post(
  "/content",
  freelancerAuthMiddleware,
  upload.single("image"),
  contentPost
);
router.get("/content", getPost);
router.patch("/content/:id/like", freelancerAuthMiddleware, likePost);
router.get("/jobs", freelancerAuthMiddleware, getJob);
router.patch("/job/:id/apply", freelancerAuthMiddleware, applyJob);

export default router;
