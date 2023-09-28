import express from 'express';
import { postController } from '../controllers/post.js';

const router = express.Router();

router.get('/posts', postController.getPosts);

router.post('/', postController.addPost);

router.delete('/:id', postController.deletePost);

export default router;
