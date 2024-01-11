import express from 'express'
import { getOrders, insert } from '../Controllers/Order.js';
import { isLogin } from '../Middlewares/isLogin.js';

const router = express.Router();

router.route('/').post(isLogin, insert).get(isLogin, getOrders);

export default router;