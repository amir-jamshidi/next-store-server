import preUserModel from '../Models/PreUser.js'
import addressModel from '../Models/Address.js'
import productModel from '../Models/Product.js'
import reminderModel from '../Models/Reminder.js'
import userModel from '../Models/User.js'
import orderModel from '../Models/Order.js'
import ticketModel from '../Models/Ticket.js'
import notificationModel from '../Models/Notification.js'
import { codeGenerator } from '../Utils/codeGenerator.js'
import jwt from 'jsonwebtoken'
import converToPersian from './../Utils/PersianDate.js';

export const register = async (req, res, next) => {
    try {
        const { phone } = req.body
        const isRegisterBefore = await userModel.findOne({ phone }).lean();
        if (isRegisterBefore) {
            return res.status(409).json({ message: 'register before' });
        }
        await preUserModel.findOneAndDelete({ phone }).lean();

        const code = codeGenerator();
        await preUserModel.create({ phone, code });
        res.status(201).json({ message: 'success' })

    } catch (error) {
        next(error)
    }


}
export const login = async (req, res, next) => {
    try {
        const { phone } = req.body;
        const isRegisterUser = await userModel.findOne({ phone }).lean();
        if (isRegisterUser) {
            //! Login
            const code = codeGenerator();
            await preUserModel.findOneAndDelete({ phone });
            await preUserModel.create({ phone, code });
            res.status(200).json({ message: "success" });
        } else {
            //! Not Register
            res.status(400).json({ message: 'not register' })
        }
    } catch (error) {
        next(error)
    }


}
export const getMe = async (req, res, next) => {
    try {

        res.status(200).json({ userInfo: req.user });
        const minders = await reminderModel.find({ userID: req.user._id }).lean();
        if (minders.length <= 0) return
        minders.forEach(async minder => {
            const { inventory, name, href: pHref } = await productModel.findOne({ _id: minder.productID }, 'inventory name href').lean();
            if (inventory > 0) {
                const title = `محصول ${name} موجود شد ، خریدتو زودتر انجام بده !`
                const href = `/product/${pHref}`
                await notificationModel.create({ userID: req.user._id, title, href });
                await reminderModel.findOneAndDelete({ userID: req.user._id, productID: minder.productID }).lean();
            }
        })
    } catch (error) {
        next(error)
    }
}
export const validation = async (req, res, next) => {
    try {
        const { phone, code } = req.body;
        const hasValidate = await preUserModel.findOneAndDelete({ phone, code }).lean();
        if (hasValidate) {
            //!Register
            const isRegisterBefore = await userModel.findOne({ phone }).lean()
            if (!isRegisterBefore) {
                const user = await userModel.create({ phone });
                const token = jwt.sign({ _id: user._id }, process.env.JWTCODE, { expiresIn: '15day' });
                const userInfo = {
                    userInfo: user,
                    token
                }
                res.status(201).json(userInfo);
            } else {
                //!Login
                const token = jwt.sign({ _id: isRegisterBefore._id }, process.env.JWTCODE, { expiresIn: '15day' });
                const userInfo = {
                    userInfo: isRegisterBefore,
                    token
                }
                res.status(200).json(userInfo);
            }
        } else {
            res.status(400).json({ message: "error" });
        }

    } catch (error) {
        next(error)
    }
}
export const addAddress = async (req, res, next) => {
    try {
        const addressCount = await addressModel.find({ userID: req.user._id }).countDocuments();
        if (addressCount === 10) {
            return res.status(202).json({ message: 'limit' })
        }
        const { country, state, city, avenue, alley, description, postalCode, reciver } = req.body
        const address = await addressModel.create({ userID: req.user._id, country, state, city, avenue, alley, description, postalCode, reciver })
        if (address) {
            res.status(201).json(address)
        }
    } catch (error) {
        next(error);
    }

}
export const deleteAddress = async (req, res, next) => {
    try {
        const { addressID } = req.params;
        await addressModel.findOneAndDelete({ userID: req.user._id, _id: addressID });
        res.status(200).json({ message: 'deleted' });
    } catch (error) {
        next(error)
    }
}
export const getAddress = async (req, res, next) => {
    try {
        const addresses = await addressModel.find({ userID: req.user._id }).sort({ _id: -1 }).lean();
        addresses.forEach(address => {
            address.createdAt = converToPersian(address.createdAt);
        })
        if (addresses) {
            res.status(200).json(addresses);
        }
    } catch (error) {
        next(error)
    }
}
export const changeFullname = async (req, res, next) => {
    try {
        const { fullname } = req.body;
        const user = await userModel.findOneAndUpdate({ _id: req.user._id }, { fullname });
        if (user) {
            res.status(200).json(user);
        }
    } catch (error) {
        next(error);
    }
}
export const getDashboard = async (req, res, next) => {
    try {
        const ordersUser = await orderModel.find({ userID: req.user._id }).sort({ _id: -1 }).populate({ path: 'productsDetails', populate: { path: 'productID' } }).populate('addressID').populate('sendMethodID').populate('orderStatusID').lean()
        const orders = ordersUser.slice(0, 3)
        orders.forEach(order => { order.createdAt = converToPersian(order.createdAt) });
        const awardCount = ordersUser.reduce((sum, cur) => sum + cur.award, 0);
        const orderCount = ordersUser.length;
        const ticketUser = await ticketModel.find({ userID: req.user._id }).sort({ _id: -1 }).lean();
        const tickets = ticketUser.slice(0, 3)
        tickets.forEach(ticket => { ticket.createdAt = converToPersian(ticket.createdAt) })
        const ticketCount = ticketUser.length;
        const notifications = await notificationModel.find({ userID: req.user._id, seen: 0 });
        res.status(200).json({ tickets, orders, orderCount, awardCount, ticketCount, notifications });
    } catch (error) {
        next(error)
    }
}
export const getOrders = async (req, res, next) => {

}
export const getUserInfos = async (req, res, next) => {

}