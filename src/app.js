import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import postRoutes from './routes/postRoutes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer();
app.use(upload.none());

app.use('/api/posts', postRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

export default app;
