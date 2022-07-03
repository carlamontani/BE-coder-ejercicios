// capa routers clase- borrar
import express from "express";
import * as datosController from "../controllers/datos.controller.js";

const router = express.Router();

router.get("/", datosController.readData);

router.post("/", datosController.saveData);

export default router;