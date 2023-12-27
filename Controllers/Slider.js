import sliderModel from '../Models/Slider.js'

export const insert = async (req, res, next) => {
    try {
        const { href, description, mode } = req.body;
        const { filename: img = '' } = req.file;
        const slider = await sliderModel.create({ img, href, description, mode });
        if (slider) {
            res.status(201).json(slider);
        }
    } catch (error) {
        next(error)
    }
}
export const remove = async (req, res, next) => {
    try {
        const { sliderID } = req.body
        const removeSlider = await sliderModel.findOneAndDelete({ _id: sliderID }).lean();
        if (removeSlider) {
            res.status(200).json({ message: 'success' });
        }
    } catch (error) {
        next(error);
    }
}
export const get = async (req, res, next) => {
    try {
        const sliders = await sliderModel.find({}).lean();
        if (sliders) {
            res.status(200).json(sliders);
        }
    } catch (error) {
        next(error)
    }
}