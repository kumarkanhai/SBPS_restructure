const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    } else {
      const existingUser = await User.findOne({
        email: email
      });

      if (existingUser) {
        return res.status(409).json({
          message: "User already exists"
        });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
          name: name,
          email: email,
          password: hashedPassword,
          role: role || "USER"
        });

        return res.status(201).json({
          message: "User registered successfully",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      }
    }
  } catch (error) {
    console.log("Register Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    } else {
      const user = await User.findOne({
        email: email
      });

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      } else {
        const isPasswordCorrect = await bcrypt.compare(
          password,
          user.password
        );

        if (!isPasswordCorrect) {
          return res.status(401).json({
            message: "Invalid email or password"
          });
        } else {
          const token = jwt.sign(
            {
              id: user._id,
              role: user.role
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1d"
            }
          );

          return res.status(200).json({
            message: "Login successful",
            token: token
          });
        }
      }
    }
  } catch (error) {
    console.log("Login Error:", error);

    return res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

module.exports = {
  register,
  login
};