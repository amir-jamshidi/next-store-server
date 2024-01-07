import express from 'express';
import { search } from '../Controllers/Search';
//--
const router = express.Router();
//--
router.route('/:query').get(search);
//--
export default router