export const insert = async (req, res, next) => {
    try {
        const { name } = req.body
    } catch (error) {
        next(error)
    }
}

