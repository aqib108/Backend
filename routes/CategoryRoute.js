const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/AdminController");



// get all Category

router.get("/", getAllCategories);

// get one Category

router.get("/:CategoryId", getCategoryById);

//post all Category

router.post("/", createCategory);

//update a Category

router.put("/:CategoryId", updateCategory);

//delete a Category

router.delete("/:CategoryId", deleteCategory);



module.exports = router;