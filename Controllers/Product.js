import productModel from '../Models/Product.js'
import videoModel from '../Models/Video.js'
import categoryModel from '../Models/Category.js'
import favoriteModel from '../Models/Favorite.js';
import filterProduct from './../Utils/FilterProduct.js';


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

export const getSimilarProducts = async (req, res, next) => {
    try {
        const { categoryID } = req.params
        const products = await productModel.find({ categoryID }).limit(10).lean();
        if (products) {
            res.status(200).json(products);
        }
    } catch (error) {
        next(error);
    }
}

export const insertVideo = async (req, res, next) => {
    try {
        const { courseID, time, href, title } = req.body;
        const { filename: video } = req.file;
        const insertVideo = await videoModel.create({ courseID, time, href, title, video });
        if (insertVideo) {
            res.status(201).json(insertVideo);
        }
    } catch (error) {
        next(error)
    }
}

export const getVideo = async (req, res, next) => {
    try {
        const { courseID } = req.params;
        const video = await videoModel.find({ courseID }).lean();
        if (video) {
            res.status(200).json(video);
        }
    } catch (error) {
        next(error);
    }
}

export const getProductsByCategory = async (req, res, next) => {
    try {
        const { href } = req.params;
        const { _id: categoryID } = await categoryModel.findOne({ href }).lean();
        const products = await productModel.find({ categoryID }).populate('categoryID').lean();
        if (products) {
            res.status(200).json(products);
        }
    } catch (error) {
        next(error);
    }
}

export const addToFavorite = async (req, res, next) => {
    try {
        const { productID } = req.body;
        const isHas = await favoriteModel.findOne({ productID }).lean();
        if (isHas) {
            res.status(400).json({ message: 'alreay' })
            return
        }
        const favorite = await favoriteModel.create({ userID: req.user._id, productID });
        if (favorite) {
            res.status(201).json(favorite);
        }
    } catch (error) {
        next(error)
    }
}

export const getFavorites = async (req, res, next) => {
    try {
        const favorites = await favoriteModel.find({ userID: req.user._id }).populate('productID').lean();
        if (favorites) {
            res.status(200).json(favorites);
        }
    } catch (error) {
        next(error)
    }
}

export const getOneFavorites = async (req, res, next) => {
    try {
        const { productID } = req.params
        const isHas = await favoriteModel.findOne({ productID });
        if (isHas) {
            res.status(200).json({ message: 1 });
            return
        } else {
            res.status(200).json({ message: 0 })
        }
    } catch (error) {
        next(error)
    }
}

export const removeFav = async (req, res, next) => {
    try {
        const { productID } = req.params
        const isHas = await favoriteModel.findOneAndDelete({ productID });
        if (isHas) {
            res.status(200).json(isHas);
        }
    } catch (error) {
        next(error)
    }
}

export const getMoreSections = async (req, res, next) => {

}

export const getAllOffsProducts = async (req, res, next) => {
    try {
        const { limit, filter = 'normal' } = req.query;
        let sort = filterProduct(filter);
        const products = await productModel.find({ isOff: 1 }).sort(sort).limit(Number(limit)).lean();
        const productsCount = await productModel.find({ isOff: 1 }).countDocuments().lean();
        if (products) {
            res.status(200).json({ products, productsCount });
        }
    } catch (error) {
        next(error)
    }
}

export const getAllProducts = async (req, res, next) => {
    try {
        const { limit, filter = 'new' } = req.query;
        let sort = filterProduct(filter);
        const products = await productModel.find({}).limit(Number(limit)).sort(sort).lean();
        const productsCount = await productModel.find({}).countDocuments().lean();
        if (products) {
            res.status(200).json({ products, productsCount });
        }
    } catch (error) {
        next(error)
    }
}




export const changePrice = async (req, res, next) => {

}
export const changeCover = async (req, res, next) => {

}

