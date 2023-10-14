import express from 'express';
import { uploadController } from '../controllers/upload.js';

const router = express.Router();

router.post('/', uploadController.uploadImageToCloudinary);

export default router;
