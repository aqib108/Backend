const OrderReview = require("../modals/OrderReviewModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Features = require("../utils/Features.js");
const fetch = require('node-fetch');
// create category

exports.createReview = catchAsyncErrors(async (req,res,next) =>{

    const category = await OrderReview.create(req.body);
    
    res.status(201).json({
        success: true,
        category
    })
});

//get all reviews

exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {
    const reviews = await OrderReview.find().populate('vendor organization order');
  
    if (!reviews) {
      return next(new Error());
    }
    res.json(reviews);
})

//get reviews by order
exports.getReviewsByOrder = catchAsyncErrors(async (req, res, next) => {
    const review = await OrderReview.findOne({ order: req.params.OrderId }).populate('vendor organization order');
  
    if (!review) {
      return next(new Error());
    }
    res.json(review);
  });
//update order review
exports.updateOrderReview = catchAsyncErrors(async (req, res, next) => {
    let review = await OrderReview.findById(req.params.id);
  
    if (!review) {
      return next(new Error());
    }
    
    review = await OrderReview.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json(review);
  });
//function fatch fake reviews
exports.scrapReviews = catchAsyncErrors(async (req, res, next) => {
  // console.log('test');return false;
  fetch("https://www.fakerestapi.com/datasets/api/v1/amazon-echo-reviews.json")
  .then(response => response.json())
  .then(json=>{
    var result = json.data.splice(0, 10).map(_data => {
      return { review_text: _data.review_text,review_rating:_data.review_rating };
        })
        res.status(200).json(result);
  });
});
  
 
  
 
  


  



