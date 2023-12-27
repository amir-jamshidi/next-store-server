import express from 'express'
import { insert, get } from '../Controllers/Brand.js';
import { isLogin } from '../Middlewares/isLogin';
import { isAdmin } from '../Middlewares/isAdmin';
//--
const router = express.Router();
//--
router.route('/').post(isLogin, isAdmin, insert);
//--
export default router