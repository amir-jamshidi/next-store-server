import express from 'express';
import { getBestLasted, getBestSell, getLasted, getOffs, getPopular, insert, remove } from '../Controllers/Product.js';
import multer from 'multer';
import { sliderStorage } from '../Utils/uploader.js';
import { isLogin } from '../Middlewares/isLogin.js';
import { isAdmin } from '../Middlewares/isAdmin.js';

const router = express.Router();

router.route('/').post(isLogin, multer({ storage: sliderStorage }).array('photos', 4), insert);
router.route('/lasted').get(getLasted);
router.route('/offs').get(getOffs);
router.route('/bestseller').get(getBestSell);
router.route('/bestlasted').get(getBestLasted);
router.route('/popular').get(getPopular);
export default router