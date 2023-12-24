import express from 'express';
import { insert } from '../Controllers/Proposal';
import { isLogin } from '../Middlewares/isLogin';
import { isAdmin } from '../Middlewares/isAdmin';
import multer from 'multer';
import { sectionsStorage } from '../Utils/uploader';

const router = express.Router();
//--
router.route('/').post(isLogin, isAdmin, multer({ storage: sectionsStorage }).single('photo'), insert)

export default router