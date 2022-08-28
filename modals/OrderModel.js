const mongoose = require("mongoose");


const OrderSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please enter the title"],
        minlength:[5,"Please enter a title atleast 5 characters"], 
        
    },
    discription : {
        type : String,
        required : [true, "Please add some order description"]
    },

    payment : {
     type : Number,
     required: [true, "Please enter payment"]
   },
   organization : {
    type : String,
    required: true, 
   },
   address : {
    type : String,
    required: true,
   },
   phone : {
    type : String,
    
   },
   vendorName : {
    type : String,
    required: true
   }


})


module.exports = mongoose.model("Order",OrderSchema);