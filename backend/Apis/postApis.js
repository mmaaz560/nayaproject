import express from 'express';
import multer from 'multer';
import { addpost, deletepost, getpost, updatepost } from '../controllers/postController.js';

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique + '-' + file.originalname);
    },
});
const upload = multer({ storage });

export const postRouter = express.Router();

postRouter.post('/add-post', upload.single('image'), addpost);
postRouter.get('/get-post', getpost);
postRouter.put('/update-post/:id', upload.single('image'), updatepost);
postRouter.delete('/delete-post/:id', deletepost);