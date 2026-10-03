const User = require("../models/User");


// Get Admin Dashboard
const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const adminUsers = await User.countDocuments({
      role: "ADMIN"
    });

    const regularUsers = await User.countDocuments({
      role: "USER"
    });

    const managerUsers = await User.countDocuments({
      role: "MANAGER"
    });

    return res.status(200).json({
      message: "Admin dashboard data",
      dashboard: {
        totalUsers: totalUsers,
        adminUsers: adminUsers,
        regularUsers: regularUsers,
        managerUsers: managerUsers
      }
    });
  } catch (error) {
    console.log("Admin Dashboard Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (users.length === 0) {
      return res.status(404).json({
        message: "Users not found"
      });
    } else {
      return res.status(200).json({
        message: "Users found",
        users: users
      });
    }
  } catch (error) {
    console.log("Get All Users Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// Get User By ID
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    } else {
      return res.status(200).json({
        message: "User found",
        user: user
      });
    }
  } catch (error) {
    console.log("Get User By ID Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// Change User Role
const changeUserRole = async (req, res) => {
  try {
    const id = req.params.id;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({
        message: "Role is required"
      });
    } else if (
      role !== "ADMIN" &&
      role !== "USER" &&
      role !== "MANAGER"
    ) {
      return res.status(400).json({
        message: "Invalid role"
      });
    } else {
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      } else {
        user.role = role;

        await user.save();

        return res.status(200).json({
          message: "User role updated successfully",
          user: user
        });
      }
    }
  } catch (error) {
    console.log("Change User Role Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// Delete User
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    } else {
      return res.status(200).json({
        message: "User deleted successfully",
        user: user
      });
    }
  } catch (error) {
    console.log("Delete User Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


module.exports = {
  getDashboard,
  getAllUsers,
  getUserById,
  changeUserRole,
  deleteUser
};