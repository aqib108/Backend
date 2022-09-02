const Requisition = require("../modals/RequisitionModal");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Features = require("../utils/Features.js");

// create post

exports.createRequisition = catchAsyncErrors(async (req,res,next) =>{

    const requisition = await Requisition.create(req.body);
    
    res.status(200).json({
        success: true,
        requisition
    })
});


exports.getAllRequisitions = catchAsyncErrors(async (req,res) =>{
    resultPerPage = 4;
    const requisitionsCount = await Requisition.countDocuments();

    const feature =  new Features(Requisition.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage)
    ;
    const requisitions = await feature.query;
    res.status(200).json({
        success: true,
        requisitions,
        requisitionsCount,
        resultPerPage
    })
});

exports.updateRequisition = catchAsyncErrors(async (req,res,next) =>{
    let requisition = await Requisition.findById(req.params.id);
    if(!requisition){
        return next(new ErrorHandler("Requisition is not found with this id", 404));
    }

    requisition = await Requisition.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true,
        useUnified: false
      });

     res.status(200).json({
        success: true,
        requisition
      })

});


exports.deleteRequisition = catchAsyncErrors(async (req,res,next) =>{
    const requisition = await Requisition.findById(req.params.id);
    if(!requisition){
        return next(new ErrorHandler("Requisition is not found with this id", 404));
    }
    await requisition.remove();
      
    res.status(200).json({
        success: true,
        message:"Requisition is deleted successfully"
    })

});

exports.getSingleRequisition = catchAsyncErrors(async (req,res, next) =>{
    const requisition = await Requisition.findById(req.params.id);
    
    if(!requisition){
        return next(new ErrorHandler("Requisition is not found with this id", 404));
    }
    res.status(200).json({
        success: true,
        requisition,
        requisitionsCount
    })

});

// Create New Review or Update the review  
exports.createRequisitionReview = catchAsyncErrors(async (req, res, next) => {
    const { rating, comment, requisitionId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
  
    const requisition = await Requisition.findById(requisitionId);
  
    const isReviewed = requisition.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
  
    if (isReviewed) {
        requisition.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
        requisition.reviews.push(review);
        requisition.numOfReviews = requisition.reviews.length;
    }
  
    let avg = 0;
  
    requisition.reviews.forEach((rev) => {
      avg += rev.rating; 
  
    });
  
    requisition.ratings = avg / requisition.reviews.length;
  
    await requisition.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });

  //get requision by organization id
  exports.getOrganizationRequisition = catchAsyncErrors(async (req,res, next) =>{
    const requisition = await Requisition.findOne({user:req.params.requisionId});
    
    res.status(200).json({
        success: true,
        requisition
    })

});
  