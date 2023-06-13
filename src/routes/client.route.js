import express from "express";
import { register, login } from "../controllers/client/client.auth.js";
import { likePost } from "../controllers/client/client.job.js";
import { clientAuthMiddleware } from "../middlewares/clientAuthToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.patch("/content/:id/like", clientAuthMiddleware, likePost);

export default router;
