export const insert = async (req, res, next) => {
    try {
        const { title, subTitle, img, href } = req.body
    } catch (error) {
        next(error)
    }
}

export const get = async (req, res, next) => {

}

