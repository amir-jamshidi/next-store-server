import express from "express";
import { get, insert } from "../Controllers/Menu.js";

//--
const router = express.Router();
//--
router.route('/').get(get).post(insert);
//--
export default router
