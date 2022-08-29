const Order = require("../modals/OrderModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Features = require("../utils/Features.js");

// create post

exports.createOrder = catchAsyncErrors(async (req,res,next) =>{

    const order = await Order.create(req.body);
    
    res.status(201).json({
        success: true,
        order
    })
});


exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.find().populate('vendor organization bid');
  
    if (!order) {
      return next(new Error());
    }
    res.json(order);
})
  exports.getOrder = catchAsyncErrors(async (req, res, next) => {
    const order = await Order.findOne({ _id: req.params.id }).populate('vendor organization bid');
  
    if (!order) {
      return next(new Error());
    }
    res.json(order);
  });
  

  exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
    let order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new Error());
    }
    
    order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json(order);
  });
  
  exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
    let order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new Error());
    }
    order = await Order.deleteOne({ _id: req.params.id });
    if (order.deletedCount == 0) return next(new Error());
    res.status(200).send({success:true,message:'sucessfully deleted'});
  });



