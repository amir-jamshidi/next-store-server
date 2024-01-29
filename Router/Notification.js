import express from 'express'
import { isLogin } from './../Middlewares/isLogin.js';
import { isAdmin } from './../Middlewares/isAdmin.js';
import { insert } from '../Controllers/Notification.js';
//--
const router = express.Router();
//--
router.route('/').post(isLogin, isAdmin, insert);
//--
export default router;