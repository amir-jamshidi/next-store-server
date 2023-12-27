import brandModel from '../Models/Brand.js';
export const insert = async (req, res, next) => {
    try {
        const { name , nameEn} = req.body
        const brand = await brandModel.create({ name , nameEn});
        if (brand) {
            res.status(201).json(brand);
        }
    } catch (error) {
        next(error)
    }
}

export const get = async (req, res, next) => {
    try {
        const brands = await brandModel.find({}).lean();
        if (brands) {
            res.status(200).json(brands);
        }
    } catch (error) {
        next(error)
    }
}

