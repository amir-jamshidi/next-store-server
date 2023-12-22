import sliderModel from '../Models/Slider.js'

export const insert = async (req, res, next) => {
    try {
        const { img, href, description } = req.body;
        const slider = await sliderModel.create({ img, href, description });
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