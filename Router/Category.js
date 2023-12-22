import express from 'express'
import { insert } from '../Controllers/Category.js';
//--
const router = express.Router();

router.route('/').post(insert);

export default router;