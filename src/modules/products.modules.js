import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    max: 100,
  },
  price: {
    type: Number,
    required: true,
    max: 10000,
  },
  thumbnail: {
    type: String,
    max: 100,
  },
  description: {
    type: String,
    required: true,
    max: 100,
  },
  stock: {
    type: Number,
    required: true,
  },
});

export const ProductsModel = mongoose.model("Products", Schema);