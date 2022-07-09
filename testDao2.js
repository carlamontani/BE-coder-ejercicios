import UserDaoFactory from "./daos/UserDaoFactory.js";

async function start() {
  const generadorDeIds = {
    id: 1,
    next() {
      return this.id++;
    },
  };

  const userDao = UserDaoFactory.getDao();
  await userDao.init();

  console.log("-----------------------------");
  console.log("1) Obtener todas las personas");
  console.log(await userDao.getAll());

  console.log("-----------------------------");
  console.log("2) Incorporar una persona");
  const persona1 = {
    userName: "Ramon",
    password: "Lolilo",
    email: "30555777",
    id: generadorDeIds.next(),
  };
  console.log(await userDao.save(persona1));

  console.log("-----------------------------");
  console.log("3) Obtener todas las personas");
  console.log(await userDao.getAll());

  console.log("-----------------------------");
  console.log("4) Incorporar otra persona");
  const persona2 = {
    userName: "Pedro",
    password: "Suarez",
    email: "35678907",
    id: generadorDeIds.next(),
  };
  console.log(await userDao.save(persona2));

  console.log("-----------------------------");
  console.log("5) Obtener todas las personas");
  console.log(await userDao.getAll());

  console.log("--------------------------------");
  console.log("6) Obtener una persona por su id");
  console.log(await userDao.getById(persona2.id));

  console.log("--------------------------------");
  console.log("7) Actualizar una persona por su id");
  console.log(
    await userDao.updateById(persona2.id, { userName: "Ana", password: "Mei", email: "37123543" }),
  );

  console.log("-----------------------------");
  console.log("8) Obtener todas las personas");
  console.log(await userDao.getAll());

  console.log("--------------------------------");
  console.log("9) Borrar una persona por su id");
  //console.log(await userDao.deleteById(persona1.id));

  console.log("-----------------------------");
  console.log("10) Obtener todas las personaaaaas");
  console.log(await userDao.getAll());

  console.log("-----------------------------");
  console.log("Borrar todas las personas (limpieza final) y desconectarme");
  //await userDao.deleteAll();
  await userDao.disconnect();
}
start();
