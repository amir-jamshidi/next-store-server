import reminderMoel from '../Models/Reminder.js';

export const insert = async (req, res, next) => {
    try {
        const { productID } = req.body;
        const remind = await reminderMoel.create({ userID: req.user._id, productID });
        if (remind) {
            res.status(201).json(remind);
        }
    } catch (error) {
        next(error);
    }
}

export const remove = async (req, res, next) => {
    try {
        const { productID } = req.params;
        const remind = await reminderMoel.findOneAndDelete({ userID: req.user._id, productID });
        if (remind) {
            res.status(200).json({ message: 'removed' })
        }
    } catch (error) {
        next(error)
    }
}

export const get = async (req, res, next) => {
    try {
        const { productID } = req.params;
        const isHas = await reminderMoel.findOne({ userID: req.user._id, productID }).lean();
        if (isHas) {
            res.status(200).json({ message: 1 });
        } else {
            res.status(200).json({ message: 0 });
        }
    } catch (error) {
        next(error);
    }
}