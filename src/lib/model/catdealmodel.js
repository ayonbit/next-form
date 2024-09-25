import mongoose from "mongoose";

const CatdealSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  discountCode: {
    type: String,
  },
  discount: {
    type: Number,
  },
});

const CatDeal =
  mongoose.models.CatDeal || mongoose.model("CatDeal", CatdealSchema);
export default CatDeal;
