import commentModel from '../Models/Comment.js';

export const insert = async (req, res, next) => {
    try {
        const { body, score, productID } = req.body;
        const { files } = req;
        const photos = files.map(file => file.filename);
        const comment = await commentModel.create({ body, score, productID, creatorID: req.user._id, photos })
        if (comment) {
            res.status(201).json(comment);
        }
    } catch (error) {
        next(error)
    }
}

export const get = async (req, res, next) => {
    try {
        const { limit = 5 } = req.query;
        const { productID } = req.params;
        const comments = await commentModel.find({ productID }).populate('creatorID').limit(Number(limit)).lean();
        const commentsCount = await commentModel.find({ productID }).countDocuments().lean();
        res.status(200).json({ comments, count: commentsCount });
    } catch (error) {
        next(error);
    }
}

export const remove = async (req, res, next) => {
}

export const getAll = async (req, res, next) => {
}

export const deleteAll = async (req, res, next) => {
}
