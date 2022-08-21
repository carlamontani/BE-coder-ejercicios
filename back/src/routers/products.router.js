import express from "express";
//import * as newsController from "../controllers/news.controller.js";
import * as productsController from "../controllers/products.controller.js";


const router = express.Router();
/*
router.get("/", newsController.getAllNews);
router.get("/:id", newsController.getNews);
router.post("/", newsController.createNews);
*/

router.get("/", productsController.getAllProducts);
router.get("/:id", productsController.getProducts);
router.post("/", productsController.createProducts);
//router.get("/:category", productsController.getProductsCategory);
//agregar un delete



export default router;