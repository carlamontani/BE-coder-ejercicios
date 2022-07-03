//CAPA SERVICIOS CLASE - BORRAAAR

import * as datosService from '../services/datos.services.js'

export function readData(req, res) {
  const response = datosService.getDatos()
  res.status(200).json(response)
}

export function saveData(req, res) {
  const {body} = req
  datosService.addDatos(body)
  res.status(200).send('data saved')
}