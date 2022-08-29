const Category = require("../modals/CategoryModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Features = require("../utils/Features.js");
const User = require("../modals/UserModal");
const Order = require("../modals/OrderModel");
const Requisition = require("../modals/RequisitionModal");
// create category

exports.createCategory = catchAsyncErrors(async (req,res,next) =>{

    // const requisition = await RequisitionModal.findOne({ _id: req.params.id });
    // if(!requisition) return next(new Error());
    const category = await Category.create(req.body);
    
    res.status(201).json({
        success: true,
        category
    })
});

//get all categories
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
    const catergories = await Category.find({});  
    if (!catergories) {
      return next(new Error());
    }
    res.json(catergories);
})
//get category by id
exports.getCategoryById = catchAsyncErrors(async (req, res, next) => {
  let category = await Category.findById(req.params.CategoryId);
  console.log(category);
    if (!category || category._id != req.params.CategoryId) {
      return next(new Error());
    }
    res.json(category);
  });
  

  exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
    let category = await Category.findById(req.params.CategoryId);
  
    if (!category || category._id != req.params.CategoryId) {
        return next(new Error());
      }
  
  
    cat = await Category.findByIdAndUpdate(req.params.CategoryId, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json(cat);
  });
  
  exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
    let category = await Category.findById(req.params.CategoryId);
  
    if (!category || category._id != req.params.CategoryId) {
        return next(new Error());
      }

    cat = await Category.deleteOne({ _id: req.params.CategoryId });
    if (cat.deletedCount == 0) return next(new Error());
    res.status(200).send("successful");
  });
  exports.getDashboard = catchAsyncErrors(async (req, res, next) => {
    let totalOrganization = await User.countDocuments({role:'organization'})
    let totalVendor = await User.countDocuments({role:'vendor'});
    let totalOrder = await Order.countDocuments({});
    let totalRequisition = await Requisition.countDocuments({});
    var dashboard ={
      totalOrganization,
      totalVendor,
      totalOrder,
      totalRequisition
    } 
    res.status(200).json(dashboard);
  });


  



