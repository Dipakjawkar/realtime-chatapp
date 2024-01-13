const mongoose = require("mongoose")

const messageModel = mongoose.Schema({
    sender:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
    },
    reciver:{
        type:mongoose.Types.ObjectId,
        ref:"user",
        required:true
    },
    message:{
        type:String,
        required:true
    },
    timestamp: {
        type: Date,
        default: Date.now
      }
})

module.exports = mongoose.model('message', messageModel)