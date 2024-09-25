import mongoose from "mongoose";
import validator from "validator";

const dealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      trim: true,
      validate: {
        validator: (value) =>
          validator.isAlphanumeric(value.replace(/\s/g, "")),
        message: "Name must be alphanumeric",
      },
    },
    link: {
      type: String,
      required: true,
      validate: {
        validator: (value) => validator.isURL(value),
        message: "Link must be a valid URL",
      },
    },
    couponcode: {
      type: String,
      required: true,
      minlength: 5,
      trim: true, // Trim whitespace
      validate: {
        validator: (value) => validator.isAlphanumeric(value),
        message: "Coupon code must be alphanumeric",
      },
    },
    discount: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
  },
  {
    timestamps: true, // Add timestamps for createdAt and updatedAt
  }
);

const Deal = mongoose.models.Deal || mongoose.model("Deal", dealSchema);
export default Deal;
