import preUserModel from '../Models/PreUser.js'
import addressModel from '../Models/Address.js'
import userModel from '../Models/User.js'
import orderModel from '../Models/Order.js'
import ticketModel from '../Models/Ticket.js'
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
export const getMe = (req, res, next) => {
    res.status(200).json({ userInfo: req.user })
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
        const addresses = await addressModel.find({ userID: req.user._id }).lean();
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
        res.status(200).json({ tickets, orders, orderCount, awardCount, ticketCount });
    } catch (error) {
        next(error)
    }
}
export const getOrders = async (req, res, next) => {

}
export const getUserInfos = async (req, res, next) => {

}