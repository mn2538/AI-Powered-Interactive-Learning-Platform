import express from "express";
import { topicDesc, chatWithBot } from "../controllers/chatWithBot.ts";

const router = express.Router();

router.post("/desc", topicDesc);
router.post("/topic", chatWithBot);
router.post("/ask", chatWithBot);

export default router;
