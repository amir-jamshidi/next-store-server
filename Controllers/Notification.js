import notificationModel from '../Models/Notification.js'

export const insert = async (req, res, next) => {

    try {
        const { userID, title, href, code = 1 } = req.body
        const notif = await notificationModel.create({ userID, title, href, code });
        if (notif) {
            res.status(201).json(notif);
        }
    } catch (error) {
        next(error);
    }
}

export const get = async (req, res, next) => {

    try {
        const notifications = await notificationModel.find({ userID: req.user._id, seen: 0 }).lean();
        if (notifications) {
            res.status(200).json(notifications);
        }
    } catch (error) {
        next(error);
    }

}

export const seen = async (req, res, next) => {

    try {
        const { id } = req.params
        const notif = await notificationModel.findOneAndUpdate({ _id: id, userID: req.user._id }, { seen: 1 }).lean();
        if (notif) {
            res.status(200).json(notif);
        }
    } catch (error) {
        next(error);
    }

}

export const getAll = async (req, res, next) => {

}
