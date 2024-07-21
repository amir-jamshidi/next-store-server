import express from 'express';
import { insert, get } from '../Controllers/Comment.js';
import { isLogin } from './../Middlewares/isLogin.js';
import multer from 'multer';
import { commentStorage } from '../Utils/uploader.js';
//--
const router = express.Router();
//--
router.route('/').post(isLogin, multer({ storage: commentStorage }).array('photos', 4), insert)
router.route('/:productID').get(get);
//--
export default router


