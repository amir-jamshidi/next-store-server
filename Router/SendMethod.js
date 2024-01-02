import express from 'express';
import { isLogin } from './../Middlewares/isLogin.js';
import { isAdmin } from './../Middlewares/isAdmin.js';
import { get, insert } from '../Controllers/sendMethod.js';

const router = express.Router();

router.route('/').post(isLogin, isAdmin, insert).get(get);

export default router;