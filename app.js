


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
import commentRouter from './Router/Comment.js'
import cartRouter from './Router/Cart.js'
import orderRouter from './Router/Order.js'
import sendMenthodRouter from './Router/SendMethod.js'
import searchRouter from './Router/Search.js'
import ticketRouter from './Router/Ticket.js'
import notificationRouter from './Router/Notification.js'
import reminderRouter from './Router/Reminder.js'
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
app.use('/videos', express.static(path.join(__dirname, 'public', 'media', 'videos')));
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
app.use('/comment', commentRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/method', sendMenthodRouter);
app.use('/search', searchRouter);
app.use('/ticket', ticketRouter);
app.use('/notification', notificationRouter);
app.use('/reminder', reminderRouter);
//--
app.use((err, req, res, next) => {
    res.status(400).json({ message: err.message })
})
//--
export default app;

