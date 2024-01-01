import cartModel from '../Models/Cart.js'

export const getCart = async (req, res, next) => {
    try {
        const cart = await cartModel.find({ userID: req.user._id }).populate({ path: 'productID', populate: { path: 'sellerID' } }).lean();

        const cartDetails = {
            cartPrice: 0,
            itemsCount: 0,
            award: 0
        };

        cart.forEach(c => {
            c.totalPrice ||= c.productID.price * Number(c.count);
            cartDetails['cartPrice'] += Number(c.totalPrice);
            cartDetails['itemsCount'] += Number(c.count);
            cartDetails['award'] += Number(c.productID.award * c.count);
        })

        if (cart) {
            res.status(200).json({ cart, cartDetails });
        }
    } catch (error) {
        next(error)
    }
}

export const insert = async (req, res, next) => {
    try {
        const { productID, count } = req.body;
        const isHasBefore = await cartModel.findOne({ productID, userID: req.user._id }).lean();
        if (isHasBefore) {
            const cart = await cartModel.findOneAndUpdate({ productID, userID: req.user._id }, { $inc: { count: +1 } }).lean();
            if (cart) {
                res.status(201).json(cart);
            }
            return
        }
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
        const { productID } = req.params;
        const remove = await cartModel.findOneAndDelete({ userID: req.user._id, productID }).lean();
        if (remove) {
            res.status(200).json(remove);
        }
    } catch (error) {
        next(error)
    }
}

export const editCart = async (req, res, next) => {
    try {
        const { action, productID } = req.body;
        const cart = await cartModel.updateOne({ userID: req.user._id, productID }, { $inc: { count: action === 'PLUS' ? +1 : -1 } });
        if (cart) {
            res.status(200).json(cart);
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
