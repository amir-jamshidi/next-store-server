import menuModel from '../Models/Menu.js'
import productModel from '../Models/Product.js'

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

        const menus = await menuModel.find({}).lean();
        const products = await productModel.find({}, 'categoryID name href').lean();

        menus.forEach(menu => {
            menu.subMenus = [];
            products.forEach(product => {
                if (product.categoryID.equals(menu.categoryID)) {
                    menu.subMenus.push(product)
                }
            })

        })

        res.status(200).json(menus);

    } catch (error) {
        next(error);
    }
}

export const insertSubMenu = async (req, res, next) => {

}

export const editMenu = async (req, res, next) => {

}

export const removeMenu = async (req, res, next) => {

}

export const editSubMenu = async (req, res, next) => {

}

export const removeSubMenu = async (req, res, next) => {

}

export const deleteAll = async (req, res, next) => {

}