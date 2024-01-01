import express from 'express';
import { isLogin } from '../Middlewares/isLogin.js';
import { editCart, getCart, insert, remove, removeAll } from '../Controllers/Cart.js';
//--
const router = express.Router();
//--
router.route('/').post(isLogin, insert);
router.route('/edit').put(isLogin, editCart)
router.route('/').get(isLogin, getCart);
router.route('/delete/:productID').delete(isLogin, remove);
router.route('/delete/all').delete(isLogin, removeAll);
//--
export default router