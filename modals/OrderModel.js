const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please enter the title"]
    },
    discription : {
        type : String,
        required : [true, "Please add some order description"]
    },
    payment : {
     type : Number,
     required: [true, "Please enter payment"]
   },
   phone : {
    type : String,
   },
   requisition: {
    type: mongoose.Schema.ObjectId,
    ref: "Requisition",
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
  },
  bid: {
    type: mongoose.Schema.ObjectId,
    ref: "Bid",
    required: true,
  }


})


module.exports = mongoose.model("Order",OrderSchema);