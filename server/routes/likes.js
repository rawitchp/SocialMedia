import express from 'express';
import { likeController } from '../controllers/like.js';

const router = express.Router();

router.get('/', likeController.getLikes);
router.post('/', likeController.addLike);
router.delete('/', likeController.deleteLike);

export default router;
