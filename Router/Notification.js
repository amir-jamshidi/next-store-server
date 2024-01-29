import express from 'express'
import { isLogin } from './../Middlewares/isLogin.js';
import { isAdmin } from './../Middlewares/isAdmin.js';
import { get, insert, seen } from '../Controllers/Notification.js';
//--
const router = express.Router();
//--
router.route('/').post(isLogin, isAdmin, insert).get(isLogin, get);
router.route('/seen/:id').put(isLogin, seen)
//--
export default router;