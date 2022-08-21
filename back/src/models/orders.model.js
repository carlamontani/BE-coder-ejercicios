import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    items: [{
      title: String,
      qty: Number
    }],
    status: {
      type: String,
      required: true,
    },
    mail: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

export const OrdersModel = mongoose.model("Order", Schema);