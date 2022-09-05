const mongoose = require("mongoose");

const requisitionschema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "please enter the title of product"],
        maxlength: [20, "title can not exceed by 20 characters"]
    },
    

    description: {
        type: String,
        required: [true, "please add the description of product"],
        maxlength: [5000, "description can not exceed by 5000 characters"]
    },

    category: {
        type: String,
        required: [true, "please add the category of product"],
    },

    status: {
        type: String,
    },
    file:{
      type:String,
    },
    attachment: [
    {
        public_id:{
            type: String,
            // required: true,
        },

        url:{
            type: String,
            // required:true,
        }
    }
],

     user:{
            type: mongoose.Schema.ObjectId,
            ref:"User",
        },

        CreatedAt:{
            type: Date,
            default: Date.now(),
        }
     
})

module.exports = mongoose.model("Requisition", requisitionschema );