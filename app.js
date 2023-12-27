import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from 'cors'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';
//--
import menusRouter from './Router/Menu.js'
import authRouter from './Router/Auth.js'
import categoriesRouter from './Router/Category.js'
import sliderRouter from './Router/Slider.js'
import productRouter from './Router/Product.js'
import proposalRouter from './Router/Proposal.js'
import sellerRouter from './Router/Seller.js'
import brandRouter from './Router/Brand.js'
//--
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
//--
const app = express();
dotenv.config();
//--
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//--
app.use('/img/products', express.static(path.join(__dirname, 'public', 'media', 'products')));
app.use('/img/sliders', express.static(path.join(__dirname, 'public', 'media', 'sliders')));
app.use('/img/sections', express.static(path.join(__dirname, 'public', 'media', 'sections')));
//--
(async () => {
    mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.MOGOURL}`).then(() => {
        console.log('MongoDB CONNECTED');
    }).catch(err => {
        console.log(`MongoDB ERROR => ${err}`);
    })
})();
//--

app.use('/menus', menusRouter);
app.use('/auth', authRouter);
app.use('/category', categoriesRouter);
app.use('/slider', sliderRouter);
app.use('/product', productRouter);
app.use('/proposal', proposalRouter);
app.use('/seller', sellerRouter);
app.use('/brand', brandRouter);
//--
app.use((err, req, res, next) => {
    res.status(400).json({ message: err.message })
})
//--
export default app;



