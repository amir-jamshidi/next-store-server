import express from 'express';
import { get, getOne, insert } from '../Controllers/Ticket.js';
import { isLogin } from '../Middlewares/isLogin.js';
//--
const router = express.Router();
//--
router.route('/').post(isLogin, insert).get(isLogin, get);
router.route('/:ticketID').get(isLogin, getOne);
//
export default router;