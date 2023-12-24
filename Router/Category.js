import express from 'express'
import { insert } from '../Controllers/Category.js';
import multer from 'multer';
import { categoryStorage } from '../Utils/uploader.js';
import { isLogin } from './../Middlewares/isLogin.js';
import { isAdmin } from './../Middlewares/isAdmin.js';
//--
const router = express.Router();

router.route('/').post(isLogin , isAdmin , multer({storage:categoryStorage}).single('photo'),insert);

export default router;