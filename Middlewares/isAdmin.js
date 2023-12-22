export const isAdmin = async (req, res, next) => {
    if (req.user.role === 'ADMIN') {
        return next();
    }
    res.status(422).json({ message: "This Route Access For Admins Only" });
}