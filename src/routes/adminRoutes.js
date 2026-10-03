const express = require("express");

const router = express.Router();

const {
  getDashboard,
  getAllUsers,
  getUserById,
  changeUserRole,
  deleteUser
} = require("../controllers/adminController");


// Admin Dashboard
router.get("/dashboard", getDashboard);


// Get All Users
router.get("/users", getAllUsers);


// Get User By ID
router.get("/users/:id", getUserById);


// Change User Role
router.put("/users/:id/role", changeUserRole);


// Delete User
router.delete("/users/:id", deleteUser);


module.exports = router;