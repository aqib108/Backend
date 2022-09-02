const Payment = require("../modals/PaymentModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Features = require("../utils/Features.js");

// create payment

exports.createPayment = catchAsyncErrors(async (req,res,next) =>{

    const payment = await Payment.create(req.body);
    
    res.status(201).json({
success: true,
payment
    })
});

//get all payment list
        
exports.getAllPayment = catchAsyncErrors(async (req, res, next) => {
    const reviews = await Payment.find().populate('vendor organization order');
  
    if (!reviews) {
      return next(new Error());
    }
    res.json(reviews);
})

//get payment by order
exports.getPaymentByOrder = catchAsyncErrors(async (req, res, next) => {
    const review = await Payment.findOne({ order: req.params.OrderId }).populate('vendor organization order');
  
    if (!review) {
      return next(new Error());
    }
    res.json(review);
  });