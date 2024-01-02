import express from 'express'
import { insert } from '../Controllers/Order.js';
import { isLogin } from '../Middlewares/isLogin.js';

const router = express.Router();

router.route('/').post(isLogin, insert);

export default router;