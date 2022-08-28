const mongoose = require("mongoose");
const ChatSchema = new mongoose.Schema({
    connection_id:{
        type: mongoose.Schema.ObjectId,
        ref:"ChatConnection",
    },
    sender_id:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
    },
    receiver_id:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
    },
    message:{
        type:String,
        required:[true,"Please your Message"],
    },
    status : {
        type : Number,
        default:0
    },
})
module.exports = mongoose.model("Chat",ChatSchema);