import express from "express";
import { getMe, login, register, validation } from "../Controllers/Auth.js";
//--
const router = express.Router();
//--
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/validation').post(validation);
router.route('/me').get(getMe);
//--
export default router