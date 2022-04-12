import express from "express";
import dotenv from "dotenv";
import { config } from "../ej6/config.js";
import knex from "knex";
import cors from "cors";
//import createUsers from "../ej6/createUsers.js";
dotenv.config();

const db = knex(config);

async function createTables() {
  try {
    const exist = await db.schema.hasTable("productos");
    if (!exist) {
      await db.schema.createTable("productos", (table) => {
        table.increments("id").primary().notNullable(),
          table.string("title").notNullable(),
          table.string("price").notNullable(),
          table.string("thumbnail").notNullable();
          table.string("description").notNullable();
      });
      console.log("🔥 Tabla creada correctamente");
    }
  } catch (error) {
    console.log(error);
  }
}

createTables();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const users = await db.select().from("productos");
    if (users) {
      console.log(users)
      res.status(200).json({ users });
    } else {
      res.status(400).send("Problema al crear el usuario");
    }
  } catch (error) {
    console.log(error);
  }
});

app.put("/:id", async(req, res) => {
  const { body } = req;
  const { params } = req;
  try {
    await db.from("productos").update(body).where(params);
    console.log("Informacion actualizada");
  } catch (error) {
    console.log(error);
  }
});

app.post("/usuarios/create", async(req, res) => {
  const { body } = req;
  try {
    const response = await db.insert(body).from("productos");
    console.log(response);
    if (response) {
      res.status(200).json({ response });
    } else {
      res.status(400).send("Problema al crear el usuario");
    }
  } catch (error) {
    console.log(error);
  }
});

app.delete("/:id", async(req, res) => {
  const { params } = req;

  try {
    await db.del().from("productos").where("id", params);
    console.log("✔️ Usuario borrado");
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`),
);
server.on("error", (err) => console.log(err));