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
        const { productID } = req.params;
        const comments = await commentModel.find({ productID }).populate('creatorID').lean();
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
}
