const mongoose = require("mongoose");
const ChatConnectionSchema = new mongoose.Schema({
    connection_id:{
        type:String,
        default:Date.now(),        
    },
    sender_id:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
    },
    receiver_id:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
    },
    status : {
        type : Number,
        default:0
    },
})
module.exports = mongoose.model("ChatConnection",ChatConnectionSchema);