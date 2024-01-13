const messageModel = require('../model/messageModel');
const userMobel = require('../model/userMobel')

exports.sendMessage = async (req, res) => {
    try{
        const { message, reciver } = req.body;

        const sen = await userMobel.findOne({ _id: req.user._id })
        const rec = await userMobel.findOne({ _id: reciver })
    
        const newMessage = await new messageModel({ "sender": sen, "message": message, "reciver": rec })
        await newMessage.save()
        res.send(newMessage);
    }catch(e){
        return res.send({
            success: false,
            message: "Server error !"
        })
    }
   
}

exports.getMessage = async (req, res) => {

    // const { reciver } = req.body;

    // const sen = await userMobel.findOne({ _id: req.user._id })
    // const rec = await userMobel.findOne({ _id: reciver })

    // const messages = await messageModel.find({ $or: { sender: sen._id, reciver: sen._id, sender: rec._id, reciver: rec._id } }, { message: 1 }).sort('-timestamp')

    // res.send(messages)

    try {
        const { reciver } = req.body;
        const sender = await userMobel.findOne({ _id: req.user._id });
        const receiverUser = await userMobel.findOne({ _id: reciver });

        const messages = await messageModel.find({
            $or: [
                { sender: sender._id, reciver: receiverUser._id },
                { sender: receiverUser._id, reciver: sender._id }
            ]
        }).sort({ timestamp: 1 });
        res.send(messages);

    } catch (e) {
        return res.send({
            success: false,
            message: "Server error !"
        })
    }

}