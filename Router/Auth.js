import express from "express";
import { getMe, login, register, validation } from "../Controllers/Auth.js";
import { isLogin } from './../Middlewares/isLogin.js';
//--
const router = express.Router();
//--
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/validation').post(validation);
router.route('/me').get(isLogin, getMe);
//--
export default router