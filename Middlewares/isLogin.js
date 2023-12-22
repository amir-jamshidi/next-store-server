export const isLogin = async (req, res, next) => {

    let { authorization = 'Bearer' } = req.headers;
    authorization = authorization.split(' ');

    if (authorization.length < 2) {
        return res.status(409).json({ message: "This Route Is Protected" });
    }
}