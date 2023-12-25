import express from 'express';
import { get, insert } from '../Controllers/Proposal.js';
import { isLogin } from '../Middlewares/isLogin.js';
import { isAdmin } from '../Middlewares/isAdmin.js';
import multer from 'multer';
import { sectionsStorage } from '../Utils/uploader.js';

const router = express.Router();
//--
router.route('/').post(isLogin, isAdmin, multer({ storage: sectionsStorage }).single('photo'), insert).get(get)
//--
export default router