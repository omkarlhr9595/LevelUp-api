import express from "express";
import { register, login } from "../controllers/freelancer/freelancer.auth.js";
import { freelancerAuthMiddleware } from "../middlewares/freelancerAuthToken.js";
import { contentPost } from "../controllers/freelancer/freelancer.content.js";
import { updateFreelancerInformation } from "../controllers/freelancer/freelancer.information.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch(
  "/information",
  freelancerAuthMiddleware,
  updateFreelancerInformation
);
router.post("/content", freelancerAuthMiddleware, contentPost);

export default router;
