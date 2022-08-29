const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({
    
    payment : {
     type : Number,
     required: [true, "Please enter payment"]
   },
   order: {
    type: mongoose.Schema.ObjectId,
    ref: "Order",
    required: true,
  },
  organization:{
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
   },
  vendor: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  }
})
module.exports = mongoose.model("Payment",PaymentSchema);