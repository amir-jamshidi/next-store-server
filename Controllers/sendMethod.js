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