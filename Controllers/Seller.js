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

