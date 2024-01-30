import express from 'express';
import { isLogin } from './../Middlewares/isLogin.js';
import { get, insert, remove } from '../Controllers/Reminder.js';
//--
const router = express.Router();
//--
router.route('/').post(isLogin, insert);
router.route('/:productID').get(isLogin, get).delete(isLogin, remove)
//
export default router