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


export const seen = async (req, res, next) => {

}