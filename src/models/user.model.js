//PARA AUTORIZACION CON JWT MONGO

import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model("Prueba", Schema);