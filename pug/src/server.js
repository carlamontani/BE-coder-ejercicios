const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./src/views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("index", {
    message: "Formulario de ingreso",
  });
});

//http://localhost:8083/medidor?title=Medidor&min=5&max=20&value=10
app.get("/medidor", (req, res) => {
  const { query } = req;
  res.render("medidor", {
    ...query,
  });
});

const PORT = 8084;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`),
);
server.on("error", (err) => console.log(err));