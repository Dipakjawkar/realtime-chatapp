const userModel = require('../model/userMobel')

exports.authMiddleware = async (req, res, next) => {
    try {
        const cookie = req.cookies.jwt
        if (!cookie) {
            return res.send({
                success: false,
                message: "Token Expired !"
            })
        }
        const user = await userModel.findOne({ tokens: cookie })
        req.user = user;
        next()
    }
    catch (e) {
        return res.send({
            success: false,
            message: "Token Error !"
        })
    }
}