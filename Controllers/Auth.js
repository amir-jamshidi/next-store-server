import preUserModel from '../Models/PreUser.js'
import userModel from '../Models/User.js'
import { codeGenerator } from '../Utils/codeGenerator.js'
import jwt from 'jsonwebtoken'

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
export const getDashboard = async (req, res, next) => {

}
export const getOrders = async (req, res, next) => {

}
export const getUserInfos = async (req, res, next) => {

}