import express, { Router } from 'express';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import likeRoutes from './routes/likes.js';
import relationshipRoutes from './routes/relationships.js';
import uploadRoutes from './routes/upload.js';
import morgan from './morganConfig.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import dotenv from 'dotenv';
import { handleUpload } from './cloudinaryConfig.js';
import { verifyAccessToken } from './helper.js';

dotenv.config();

const app = express();

//middlewares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use(
  morgan(
    `:splitter\x1b[33m:method\x1b[0m \x1b[36m:url\x1b[0m :statusColor :response-time ms - length|:res[content-length]`
  )
);

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './upload');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + file.originalname);
//   },
// });
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const myUploadMiddleware = upload.single('file');

// app.post('/api/upload', upload.single('file'), (req, res) => {
//   const file = req.file;
//   res.status(200).json(file.filename);
// });
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.use('/api/users', verifyAccessToken, userRoutes);

app.use('/api/posts', verifyAccessToken, postRoutes);

app.use('/api/comments', verifyAccessToken, commentRoutes);

app.use('/api/likes', verifyAccessToken, likeRoutes);

app.use('/api/relationships', verifyAccessToken, relationshipRoutes);

app.use('/api/upload', verifyAccessToken, myUploadMiddleware, uploadRoutes);

app.listen(4000, () => {
  console.log('⭐ SERVER START! ⭐');
});
