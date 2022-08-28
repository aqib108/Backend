const mongoose = require("mongoose");


const CategorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please enter the Category title"],        
    },

    discription : {
        type : String,
    },
    status : {
        type : Number,
        default:1
    },


  


})

module.exports = mongoose.model("Category",CategorySchema);