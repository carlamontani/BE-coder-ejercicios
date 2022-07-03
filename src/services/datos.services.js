//de prueba. funciona bien- borrar http://localhost:3000/datos
const datos = []

export function addDatos(data){
  datos.push(data)
}

export function getDatos(){
  return datos
}