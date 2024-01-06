import menuModel from '../Models/Menu.js'

export const insert = async (req, res, next) => {
    try {
        const { title, href, categoryID } = req.body
        const menu = await menuModel.create({ title, href, categoryID });
        if (menu) {
            res.status(201).json(menu);
        }
    } catch (error) {

        next(error);
    }
}

export const get = async (req, res, next) => {
    try {
        const menus = await menuModel.find({});
        res.status(200).json(menus);
    } catch (err) {
        next(err);
    }
}

export const insertSubMenu = async (req, res, next) => {

}