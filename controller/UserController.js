const User = require("../modals/UserModal");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const sendToken = require("../utils/jwtToken.js");
const sendMail = require("../utils/sendMails.js");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

exports.createUser = catchAsyncErrors(async (req, res, next) => {
  console.log();
  const { name, email, password, cpassword, phone, CNIC, address, role } =
    req.body;

  const user = await User.create({
    name,
    email,
    phone,
    CNIC,
    address,
    password,
    cpassword,
    role,
    avatar: {
      public_id: "http://test.com",
      url: "http://test.com",
    },
  });

  sendToken(user, 201, res);
});

// login vendor

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter your email & password", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler("User is not find with this email & password", 401)
    );
  }
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("User is not find with this email & password", 401)
    );
  }

  sendToken(user, 201, res);
});

//  Log out user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Log out success",
  });
});

// Forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Get ResetPassword Token

  const resetToken = user.getResetToken();

  await user.save({
    validateBeforeSave: false,
  });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl}`;

  try {
    await sendMail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} succesfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;

    await user.save({
      validateBeforeSave: false,
    });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Create Token hash

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTime: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset password url is invalid or has been expired", 400)
    );
  }

  if (req.body.password !== req.body.cpassword) {
    return next(
      new ErrorHandler("Password is not matched with the confirm password", 400)
    );
  }

  user.password = req.body.password;
  user.cpassword = req.body.cpassword;

  user.resetPasswordToken = undefined;
  user.resetPasswordTime = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//  Get user Details
exports.userDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.user_id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Password

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("New Password not matched with Confirm password", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});


// Update User Profile
exports.updateProfile = catchAsyncErrors(async(req,res,next) =>{
  const newUserData = {
      name: req.body.name,
      phone: req.body.phone,
      CNIC: req.body.CNIC,
      address: req.body.address
  };

const user = await User.findByIdAndUpdate(req.body.user_id, newUserData, {
  new: true,
  runValidator: true,
  useFindAndModify: false,
});

res.status(200).json({
  success: true,
  user,
});

});

// Get All users ---Admin
exports.getAllUsers = catchAsyncErrors(async (req,res,next) =>{
  const users = await User.find();

  res.status(200).json({
      success: true,
      users,
  });
});

// Get Single User Details ---Admin
exports.getSingleUser = catchAsyncErrors(async (req,res,next) =>{
  const user = await User.findById(req.params.id);
 
  if(!user){
      return next(new ErrorHandler("User is not found with this id",400));
  }

  res.status(200).json({
      success: true,
      user,
  });
});

// Change user Role --Admin
exports.updateUserRole = catchAsyncErrors(async(req,res,next) =>{
  const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id,newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
  });

  res.status(200).json({
      success: true,
      user
  })
});

// Delete User ---Admin
exports.deleteUser = catchAsyncErrors(async(req,res,next) =>{
  
  const user = await User.findById(req.params.id);

   if(!user){
       return next(new ErrorHandler("User is not found with this id",400));
   }

   await user.remove();

   res.status(200).json({
       success: true,
       message:"User deleted successfully"
   })
});
//update user status --Admin
exports.updateUserStatus = catchAsyncErrors(async(req,res,next) =>{
  const newUserData = {
      status: req.body.status,
  };
  const user = await User.findByIdAndUpdate(req.params.id,newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
  });

  res.status(200).json({
      success: true,
      user
  })
});
//function change password
exports.changePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.find({email:req.body.email});
  
  if(!user){
    return next(new ErrorHandler("User is not found against this email",400));
  }

  changepassword = await bcrypt.hash(req.body.password,10);
  User.update({email:req.body.email},{password:changepassword}).then(updatedRows=>{
    if(updatedRows.matchedCount===0){
      res.status(200).json({
        success: true,
        message: "Your email is wrong"
      })
    }else
    {
      res.status(200).json({
        success: true,
        message: "Successfully Updated"
      })
    }

      
  }).catch(err=>{
    console.log(err)
  });


});