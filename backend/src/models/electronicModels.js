import mongoose from "mongoose";

const electronicSchema = new mongoose.Schema(
  {
    product_id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    selling_price: {
      type: Number,
      required: true,
    },
    stock_in: {
      type: Number,
      required: true,
    },
    purchased_at: {
      type: Date,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const electronics = mongoose.model("electronics", electronicSchema);
export default electronics;
