import express from 'express'
import multer from 'multer';
import { sliderStorage } from '../Utils/uploader.js'
import { isLogin } from '../Middlewares/isLogin.js';

const router = express.Router();

router.route('/').post(isLogin, multer({ storage: sliderStorage }).single('photo'));

export default router;