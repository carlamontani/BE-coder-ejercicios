import express, { json, urlencoded } from "express";
const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

import { faker } from "@faker-js/faker";

app.get("/api/productos-test", (req, res) => {
  const n = req.params.n
  const users = [];
  for (let i = 0; i < 5; i++) {
    const user = {
      id: i + 1,
      name: faker.name.findName(),
      price: faker.commerce.price(100),
      thumbnail: faker.image.abstract(300, 300),
    };
    users.push(user);
  }
  res.status(200).json({ users });
});


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