export const insert = async (req, res, next) => {
    try {
        const { name } = req.body
        const brand = await brandModel.create({ name });
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

