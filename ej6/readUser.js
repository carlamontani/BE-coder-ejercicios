import { knex } from "./db.js";

export default async function readUser() {
  try {
    const users = await knex.select().from("usuarios");
    // .where("id", ">", 4).orderBy("id", "desc");
    console.log('lala');
    console.log(users);
    return users;
  } catch (error) {
    console.log(error);
  } finally {
    knex.destroy();
  }
}
