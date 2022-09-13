const mongoose = require("mongoose");


const VendorReviewSchema = new mongoose.Schema({
    
    vendor: { type:mongoose.Schema.Types.ObjectId, ref:'User', required:true },
    reviews: { type: Array },
    
})


module.exports = mongoose.model("VendorReview",VendorReviewSchema);