
   
import { knex } from "./db.js";

const users = [
  { firstName: "Name1rrr1", lastName: "Last1", email: "n1@n.com" },
  { firstName: "Narrrme32", lastName: "Last3", email: "n3@n.com" },
];

export default async function createUsers() {
  try {
    const response = await knex.insert(users).from("usuarios2");
    console.log("✔ ️Usuarios agregados");
    console.log(response);
    if (response) {
      return response
    } else {
      return false
    }
  } catch (error) {
    console.log(error);
  } finally {
    knex.destroy();
  }
}