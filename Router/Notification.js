import express from 'express'
import { isLogin } from './../Middlewares/isLogin';
import { isAdmin } from './../Middlewares/isAdmin';
import { insert } from '../Controllers/Notification';
//--
const router = express.Router();
//--
router.route('/').post(isLogin, isAdmin, insert);
//--
export default router;