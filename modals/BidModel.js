const mongoose = require("mongoose");


const BidSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please enter the title"],
        minlength:[5,"Please enter a title atleast 5 characters"], 
        
    },

    discription : {
        type : String,
        required : [true, "Please add some description"]
    },

    amount:{
       type:Number,
       required:[true,"Please enter the  amoount"],
      
   },
   attachment : {
    type : String,
   },
   requisition: {
    type: mongoose.Schema.ObjectId,
    ref: "Requisition",
    required: true,
  },


})


module.exports = mongoose.model("Bid",BidSchema);