const express = require("express");
const { body } = require("express-validator");
const {
  createEnquiry,
  getAllEnquiries,
  updateEnquiry,
  getEnquiryById,
  deleteEnquiry,
} = require("../controllers/enquiryController");
const { protect, adminOnly } = require("../middleware/auth");
const validate = require("../middleware/validation");

const router = express.Router();

router.post(
  "/",
  [
    body("studentName").notEmpty().withMessage("Student name is required"),
    body("parentName").notEmpty().withMessage("Parent name is required"),
    body("phone").notEmpty().withMessage("Phone is required"),
    body("email").optional().isEmail().withMessage("Valid email is required"),
  ],
  validate,
  createEnquiry,
);

router.get("/", protect, adminOnly, getAllEnquiries);
router.get("/:id", getEnquiryById);
router.put(
  "/:id",
  protect,
  adminOnly,
  [
    body("status")
      .isIn(["NEW", "CONTACTED", "CLOSED"])
      .withMessage("Invalid status"),
  ],
  validate,
  updateEnquiry,
);

router.delete("/:id", deleteEnquiry);

module.exports = router;
