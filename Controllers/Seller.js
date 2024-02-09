import sellerModel from '../Models/Seller.js'

export const insert = async (req, res, next) => {
    try {
        const { name, href, score } = req.body
        const seller = await sellerModel.create({ name, href, score });
        if (seller) {
            res.status(201).json(seller);
        }
    } catch (error) {
        next(error)
    }
}


export const remove = async (req, res, next) => {

}
export const removeAll = async (req, res, next) => {

}
export const get = async (req, res, next) => {

}