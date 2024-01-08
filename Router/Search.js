import express from 'express';
import { search } from '../Controllers/Search.js';
//--
const router = express.Router();
//--
router.route('/:query').get(search);
//--
export default router