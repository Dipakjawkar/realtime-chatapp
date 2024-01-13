const userModel = require('../model/userMobel');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.signup = async (req, res) => {
    try {
        let { name, email, password, online } = req.body
        if (!name || !email || !password) {
            return res.send({
                success: false,
                message: "fill all filds !"
            })
        }
        let user = await userModel.findOne({ email: email });
        if (user) {
            return res.send({
                success: false,
                message: "email is already exists"
            })
        } else {

            password = await bcrypt.hash(password, 10);
            user = new userModel({ name, email, password });
            await user.save()
            return res.send({
                success: true,
                message: "signup suceessful !",
                user
            })
        }
    } catch {
        return res.send({
            success: false,
            message: "Unexpected Error !"
        })
    }
}
exports.signin = async (req, res) => {
    try {
        const { email, password, online } = req.body
        if (!email || !password) {
            return res.send({
                success: false,
                message: "fill all filds !"
            })
        }

        let user = await userModel.findOne({ email: email });
        if (!user) {
            return res.send({
                success: false,
                message: "Invalid credintials"
            })
        }

        const userIs = await bcrypt.compare(password, user.password)
        if (!userIs) {
            return res.send({
                success: false,
                message: "Invalid credintials"
            })
        }

        const token = await jwt.sign({ id: user._id }, process.env.HASH_KEY)
        await userModel.updateOne({ email: email }, { $set: { tokens: token } })
        await userModel.updateOne({ email: email }, { $set: { online: true } })
        return res.cookie('jwt', token).send({
            success: true,
            message: "signin suceessful !",
            user
        })


    } catch {
        return res.send({
            success: false,
            message: "Unexpected Error !"
        })
    }

}

exports.getUser = async (req, res) => {
    try {
        const user = req.user._id
        const users = await userModel.find({ _id: { $ne: user } }).sort("-update-at");
        return res.send({
            message: "all users",
            success: true,
            user,
            users
        })
    } catch (e) {
        return res.send({
            message: "sever error !",
            success: false
        })
    }

}

exports.signout = async (req, res) => {
    try {
        const user = req.user;
        const userIs = await userModel.findOneAndUpdate({ _id: user._id }, { $unset: { tokens: 1 }, $set: { online: false } }, { new: true })
        return res.clearCookie('jwt').send({
            success: true,
            message: "Signout Sucessful !",
            userIs
        })
    } catch (e) {
        return res.send({
            success: false,
            message: "server error !"
        })
    }

}

exports.verifyUser = async (req,res)=>{
try{
    const user = req.user;
    const userIs = await userModel.findOne({ _id: user._id })
    return res.clearCookie('jwt').send({
        success: true,
        message: "Verifid !",
        userIs
    })
}catch(e){
    return res.send({
        success: false,
        message: "server error !"
    })
}
}