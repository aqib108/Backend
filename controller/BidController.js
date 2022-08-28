const Bid = require("../modals/BidModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Features = require("../utils/Features.js");
const RequisitionModal = require("../modals/RequisitionModal");

// create post

exports.createBid = catchAsyncErrors(async (req,res,next) =>{

    const requisition = await RequisitionModal.findOne({ _id: req.params.id });
    if(!requisition) return next(new Error());


    req.body.requisition = requisition._id
   

    const bid = await Bid.create(req.body);
    
    res.status(201).json({
        success: true,
        bid
    })
});


exports.getAllBids = catchAsyncErrors(async (req, res, next) => {
    const bid = await Bid.find({ requisition : req.params.id });

    console.log(bid)
  
    if (!bid) {
      return next(new Error());
    }
    res.json(bid);
})
  exports.getBid = catchAsyncErrors(async (req, res, next) => {
    const bid = await Bid.findOne({ _id: req.params.bidId });
  
    if (!bid || bid.requisition != req.params.id) {
      return next(new Error());
    }
    res.json(bid);
  });
  

  exports.updateBid = catchAsyncErrors(async (req, res, next) => {
    let bid = await Bid.findById(req.params.bidId);
  
    if (!bid || bid.requisition != req.params.id) {
        return next(new Error());
      }
  
  
    
    bid = await Bid.findByIdAndUpdate(req.params.bidId, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json(bid);
  });
  
  exports.deleteBid = catchAsyncErrors(async (req, res, next) => {
    let bid = await Bid.findById(req.params.bidId);
  
    if (!bid || bid.requisition != req.params.id) {
        return next(new Error());
      }

    bid = await Bid.deleteOne({ _id: req.params.bidId });
    if (bid.deletedCount == 0) return next(new Error());
    res.status(200).send("successful");
  });



  



