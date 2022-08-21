import { NewsBase } from "./newsBase.DAO.js";
//import { NewsModel } from "../../models/news.model.js";
import { ProductsModel } from "../../models/products.model.js";
import { OrdersModel } from "../../models/orders.model.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export class ProductsMongo extends NewsBase {
  static init() {
    mongoose.connect(process.env.MONGO_URI, (err) => {
      if (err) {
        console.log("Error:", err);
      } else {
        console.log("Conectadee");
      }
    });
  }

//PRODUCTS
  async getAllProducts() {
    try {
      const response = await ProductsModel.find();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts(id) {
    try {
      const response = await ProductsModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createProducts(news) {
    try {
      console.log('lalal')
      const response = await ProductsModel.create(news);
      return response;
    } catch (error) {
      console.log(error);
    }
  }


  //ORDERS
  async getAllOrders() {
    try {
      const response = await OrdersModel.find();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getOrders(id) {
    try {
      const response = await OrdersModel.findById(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createOrders(news) {
    try {
      console.log('lalal')
      const response = await OrdersModel.create(news);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}