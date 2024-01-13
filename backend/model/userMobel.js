const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    online:{
        type:Boolean,
        default:false
    },

    tokens: {
        type:String
    }
},{
    timestamps: {
        createAt: 'create-at',
        updateAt: 'update-at'
    }
})

module.exports = mongoose.model('user',userSchema);