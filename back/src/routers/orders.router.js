import express from "express";
//import * as newsController from "../controllers/news.controller.js";
import * as ordersController from "../controllers/orders.controller.js";


const router = express.Router();
/*
router.get("/", newsController.getAllNews);
router.get("/:id", newsController.getNews);
router.post("/", newsController.createNews);
*/

router.get("/", ordersController.getAllOrders);
router.get("/:id", ordersController.getOrders);
router.post("/", ordersController.createOrders);
//router.get("/:category", productsController.getProductsCategory);
//agregar un delete



export default router;