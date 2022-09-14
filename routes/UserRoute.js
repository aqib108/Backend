const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  userDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  updateUserStatus,
  changePassword,
  vendorReviews
} = require("../controller/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

// import routes

router.route("/registration").post(createUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/password/forgot").post(forgotPassword);
//change password
router.route("/change/password").post(changePassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/me/update").put(updatePassword);

router.route("/me/:user_id").get(userDetails);

//get vendor reviews for orgnazition 
router.route("/vendor/reviews/:user_id").get(vendorReviews);

router.route("/me/update/info").put(updateProfile);

router
  .route("/admin/users")
  .get(getAllUsers);

  router
  .route("/admin/update/user/status/:id")
  .put(updateUserStatus);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
