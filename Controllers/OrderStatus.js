import orderStatusModel from '../Models/OrderStatus.js';

export const insertStatus = async (req, res, next) => {
    try {
        const { title, code, href, description } = req.body;
        const status = await orderStatusModel.create({ title, code, href, description });
        if (status) {
            res.status(201).json(status);
        }
    } catch (error) {
        next(error)
    }
}