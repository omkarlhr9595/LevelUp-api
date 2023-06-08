import express from "express";
import { register, login } from "../controllers/freelancer/freelancer.auth.js";
import { freelancerAuthMiddleware } from "../middlewares/freelancerAuthToken.js";
import {
  contentPost,
  getPost,
} from "../controllers/freelancer/freelancer.content.js";
import { updateFreelancerInformation } from "../controllers/freelancer/freelancer.information.js";
import { upload } from "../middlewares/upload.js";
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

export default router;
