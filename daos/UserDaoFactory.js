//import PersonasDaoFile from "./PersonasDaoFile.js";
import UserDaoDb from "./UserDaoDb.js";
//import PersonasDaoMem from "./PersonasDaoMem.js";

const rutaArchivoPersonas = "./user.txt";
const cnxStr = "mongodb://localhost/user"; //por ahora aca, ver porque es local y porque no hay .env

const opcion = process.argv[2] || "Mem";

let dao;
switch (opcion) {
  case "mongo":
    dao = new UserDaoDb(cnxStr);
    dao.init();
    break;
  /* 
  case "file":
    //dao = new PersonasDaoFile(rutaArchivoPersonas);
    dao.init();
    break;
  default:
    //dao = new PersonasDaoMem();*/
}

export default class UserDaoFactory {
  static getDao() {
    return dao;
  }
}
