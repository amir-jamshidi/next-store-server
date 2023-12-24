import express from 'express'
import multer from 'multer';
import { sliderStorage } from '../Utils/uploader.js'
import { isLogin } from '../Middlewares/isLogin.js';
import { get, insert } from '../Controllers/Slider.js';
import { isAdmin } from '../Middlewares/isAdmin.js';

const router = express.Router();

router.route('/').post(isLogin, isAdmin, multer({ storage: sliderStorage }).single('photo'), insert).get(get);

export default router;