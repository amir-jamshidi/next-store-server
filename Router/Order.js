import express from 'express'
import { getOne, getOrders, insert } from '../Controllers/Order.js';
import { isLogin } from '../Middlewares/isLogin.js';
import { isAdmin } from './../Middlewares/isAdmin.js';
import { insertStatus } from '../Controllers/OrderStatus.js';

const router = express.Router();

router.route('/').post(isLogin, insert).get(isLogin, getOrders);
router.route('/:orderID').get(isLogin, getOne);

router.route('/order-status').post(isLogin, isAdmin, insertStatus);
export default router;