import categoryModel from '../Models/Category.js';

export const insert = async (req, res, next) => {
    try {
        const { title, href } = req.body;
        const { filename: img } = req.file;
        console.log(img);
        const category = await categoryModel.create({ title, href, img });
        if (category) {
            res.status(201).json(category)
        }
    } catch (error) {
        next(error)
    }
}

export const remove = async (req, res, next) => {
    try {
        const { categoryID } = req.body;
        const removeCategory = await categoryModel.findOneAndDelete({ _id: categoryID }).lean();
        if (removeCategory) {
            res.status(200).json({ message: "success" });
        }
    } catch (error) {
        next(error)
    }
}

export const get = async (req, res, next) => {
    try {
        const categories = await categoryModel.find({}).lean();
        if (categories) {
            res.status(200).json(categories);
        }
    } catch (error) {
        next(error);
    }
}

export const getAll = async (req, res, next) => {

}

export const removeAll = async (req, res, next) => {

}
export const editAll = async (req, res, next) => {

}