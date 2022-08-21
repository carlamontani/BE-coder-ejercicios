import DAO from "../services/DAOs/newsFactory.js";
//import DTO from "../services/DTOs/news.DTO.js";
import { ordersDTO } from "../services/DTOs/products.DTO.js";

export async function getAllOrders(req, res) {
  try {
    const allOrders = await DAO.getAllOrders();
    if (allOrders) {
      const newOrders = allOrders.map((orders) => ordersDTO(orders));
      res.status(200).json({ orders: newOrders });
    }
  } catch (error) {
    res.status(501).send(error.message);
  }
}

export async function getOrders(req, res) {
  try {
    const { id } = req.params;
    const orders = await DAO.getOrders(id);
    if (orders) {
      res.status(200).json({ orders: ordersDTO(orders) });
    }
  } catch (error) {
    res.status(501).send(error.message);
  }
}

export async function createOrders(req, res) {
  try {
    const { body } = req;
    const newOrders = await DAO.createOrders(body);
    if (newOrders) {
      res.status(200).json({ products: ordersDTO(newOrders) });
    }
  } catch (error) {
    res.status(501).send(error.message);
  }
}