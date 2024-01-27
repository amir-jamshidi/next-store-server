import jwt from 'jsonwebtoken'
import userModel from '../Models/User.js'
export const isLogin = async (req, res, next) => {

    let { authorization = 'Bearer' } = req.headers;
    authorization = authorization.split(' ');

    if (authorization.length < 2) {
        return res.status(401).json({ message: "This Route Is Protected" });
    }
    const [, token] = authorization;
    try {
        const { _id } = jwt.verify(token, process.env.JWTCODE);
        const user = await userModel.findOne({ _id });
        req.user = user;
        return next();
    } catch (error) {
        res.status(422).json({ message: error.message });
    }
}