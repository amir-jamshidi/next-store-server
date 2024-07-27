import express from "express";
import { addAddress, changeFullname, deleteAddress, getAddress, getDashboard, getMe, login, register, validation } from "../Controllers/Auth.js";
import { isLogin } from './../Middlewares/isLogin.js';
//--
const router = express.Router();
//--


router.route('/register').post(register);
router.route('/login').post(login);
router.route('/validation').post(validation);
router.route('/me').get(isLogin, getMe);
router.route('/address').post(isLogin, addAddress).get(isLogin, getAddress);
router.route('/edit').put(isLogin, changeFullname);
router.route('/dashboard').get(isLogin, getDashboard);
router.route('/address/:addressID').delete(isLogin, deleteAddress);
//--
export default router

