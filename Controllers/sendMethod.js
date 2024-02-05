import sendMethodModel from '../Models/sendMethod.js';

export const insert = async (req, res, next) => {
    try {
        const { title, time } = req.body;
        const sendMethod = await sendMethodModel.create({ title, time });
        if (sendMethod) {
            res.status(201).json(sendMethod);
        }
    } catch (error) {
        next(error);
    }
}

export const get = async (req, res, next) => {
    try {
        const methods = await sendMethodModel.find({}).lean();
        res.status(200).json(methods)
    } catch (error) {
        next(error);
    }
}

export const changeMethod = async (req, res, next) => {

}
export const remove = async (req, res, next) => {

}
export const getAll = async (req, res, next) => {

}