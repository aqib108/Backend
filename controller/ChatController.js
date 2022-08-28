const Message = require("../modals/MessageModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const Features = require("../utils/Features.js");
// create category

exports.createMessage = catchAsyncErrors(async (req, res, next) => {
  // const requisition = await RequisitionModal.findOne({ _id: req.params.id });
  // if(!requisition) return next(new Error());
  const message = await Message.create(req.body);

  res.status(201).json({
    success: true,
    message,
  });
});

//get all messages by user
exports.getMeesagesByUserId = catchAsyncErrors(async (req, res, next) => {
  var chat = await Message.find({ user: req.params.user_id }).populate('user').populate('sender').limit(20);
  if (!chat) {
    return next(new Error());
  }
  res.json(chat);
});
//get category by id
