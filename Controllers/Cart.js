import cartModel from '../Models/Cart.js'

export const getCart = async (req, res, next) => {
    try {
        // const cart = await cartModel.find({ userID: req.user._id }).populate('productID', 'name isOff discount price href photos sellerID').lean();
        const cart = await cartModel.find({ userID: req.user._id }).populate({ path: 'productID', populate: { path: 'sellerID' } }).lean();
        if (cart) {
            res.status(200).json(cart);
        }
    } catch (error) {
        next(error)
    }
}

export const insert = async (req, res, next) => {
    try {
        const { productID, count } = req.body;
        const cart = await cartModel.create({ productID, userID: req.user._id, count });
        if (cart) {
            res.status(201).json(cart);
        }
    } catch (error) {
        next(error)
    }
}

export const remove = async (req, res, next) => {
    try {
        const { userID, productID } = req.body;
        const remove = await cartModel.findOneAndDelete({ userID, productID }).lean();
        if (remove) {
            res.status(200).json(remove);
        }
    } catch (error) {
        next(error)
    }
}

export const removeAll = async (req, res, next) => {
    try {
        const { userID } = req.body;
        await cartModel.deleteMany({ userID }).lean();
        res.status(200).json({ message: 'success' });
    } catch (error) {
        next(error)
    }
}
