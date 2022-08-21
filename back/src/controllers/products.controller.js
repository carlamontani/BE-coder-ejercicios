import DAO from "../services/DAOs/newsFactory.js";
//import DTO from "../services/DTOs/news.DTO.js";
import {productsDTO } from "../services/DTOs/products.DTO.js";

export async function getAllProducts(req, res) {
  try {
    const allProducts = await DAO.getAllProducts();
    if (allProducts) {
      const newProducts = allProducts.map((products) => productsDTO(products));
      res.status(200).json({ products: newProducts });
    }
  } catch (error) {
    res.status(501).send(error.message);
  }
}

export async function getProducts(req, res) {
  try {
    const { id } = req.params;
    const products = await DAO.getProducts(id);
    if (products) {
      res.status(200).json({ products: productsDTO(products) });
    }
  } catch (error) {
    res.status(501).send(error.message);
  }
}

export async function createProducts(req, res) {
  try {
    const { body } = req;
    const newProducts = await DAO.createProducts(body);
    if (newProducts) {
      res.status(200).json({ products: productsDTO(newProducts) });
    }
  } catch (error) {
    res.status(501).send(error.message);
  }
}