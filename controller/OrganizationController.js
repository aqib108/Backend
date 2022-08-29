const OrderReview = require("../modals/OrderReviewModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Features = require("../utils/Features.js");

// create category

exports.createReview = catchAsyncErrors(async (req,res,next) =>{
    
    const category = await OrderReview.create(req.body);
    
    res.status(201).json({
        success: true,
        category
    })
});



  

 
  
 
  


  



