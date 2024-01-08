import productModel from '../Models/Product.js'
import categoryModel from '../Models/Category.js'

export const search = async (req, res, next) => {
    try {
        const { query } = req.params
        const q = new RegExp(query);
        const resultProducts = await productModel.find({ name: { $regex: q } })
        const resultCategories = await categoryModel.find({ title: { $regex: q } });
        res.status(200).json({ products: resultProducts, categories: resultCategories });
    } catch (error) {

    }
}