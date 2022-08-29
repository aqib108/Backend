const mongoose = require("mongoose");


const OrderReviewSchema = new mongoose.Schema({
    
    discription : {
        type : String,
        required : [true, "Please add some Review description"]
    },
    order: { type:mongoose.Schema.Types.ObjectId, ref:'Order', required:true },
    vendor: { type:mongoose.Schema.Types.ObjectId, ref:'User', required:true },
    organization: { type:mongoose.Schema.Types.ObjectId, ref:'User', required:true },

})


module.exports = mongoose.model("OrderReview",OrderReviewSchema);