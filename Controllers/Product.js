import productModel from '../Models/Product.js'


export const insert = async (req, res, next) => {
    try {
        const photos = req.files.map(file => file.filename);
        const {
            name, description, attributes, categoryID,
            sellerID, code, award, warranty, inventory, score,
            colors, price, isOff, discount, sendTime, href } = req.body


        const newProduct = await productModel.create({
            name, description, award, attributes: JSON.parse(attributes),
            categoryID, sellerID, code, sendTime, href,
            warranty, inventory, score, colors: JSON.parse(colors), price, isOff, discount, photos
        })

        if (newProduct) {
            res.status(201).json(newProduct);
        }
    } catch (error) {
        next(error)
    }
}

export const remove = async (req, res, next) => {
    try {
        const { productID } = req.body;
        const removeProduct = await productModel.findOneAndDelete({ _id: productID }).lean();
        if (removeProduct) {
            res.status(200).json({ message: "success" });
        }
    } catch (error) {
        next(error);
    }
}

export const getLasted = async (req, res, next) => {

    try {
        const lastedProducts = await productModel.find({ isOff: 0 }).sort({ _id: -1 }).limit(10).lean();
        if (lastedProducts) {
            res.status(200).json(lastedProducts);
        }
    } catch (error) {
        next(error);
    }

}

export const getOffs = async (req, res, nxet) => {

    try {
        const offProducts = await productModel.find({ isOff: 1 }).sort({ _id: -1 }).limit(10).lean();
        if (offProducts) {
            res.status(200).json(offProducts);
        }
    } catch (error) {
        next(error)
    }

}

export const getPopular = async (req, res, next) => {
    try {
        const popularProducts = await productModel.find({}).limit(10).lean();
        if (popularProducts) {
            res.status(200).json(popularProducts);
        }
    } catch (error) {
        next(error)
    }
}

export const getBestSell = async (req, res, next) => {
    try {
        const bestSellProducts = await productModel.find({}).limit(10).lean();
        if (bestSellProducts) {
            res.status(200).json(bestSellProducts);
        }
    } catch (error) {
        next(error)
    }
}

export const getBestLasted = async (req, res, next) => {
    try {
        const beastLastedProducuts = await productModel.find({}).limit(10).lean();
        if (beastLastedProducuts) {
            res.status(200).json(beastLastedProducuts);
        }
    } catch (error) {
        next(error)
    }
}

export const getProduct = async (req, res, next) => {
    try {
        const { href } = req.params;
        const product = await productModel.findOne({ href }).populate('categoryID').populate('sellerID').populate('brandID').lean();
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "product not found" });
        }
    } catch (error) {
        next(error)
    }
}

export const getMoreSections = async (req, res, next) => {

}