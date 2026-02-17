import express from 'express';
import { generateContent } from '../controllers/aiController.js';

const router = express.Router();

// Content generation endpoint
router.post('/', generateContent);

export default router;
