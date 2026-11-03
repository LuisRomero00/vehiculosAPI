require("dotenv").config();
const helloRoutes = require("./routes/hello.routes");
const errorHandler = require("./middlewares/error.middleware");
const express = require("express");
const pool = require("./config/database")

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("API funcionando correctamente");
});

app.use("/api", helloRoutes)

app.use(errorHandler) //Debe ir despues de registrar las rutas y antes de app.listen()

//Esta es la primera conexion, la dejo comentada por si la conexion con la DB no resulta
/*app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});*/

const startServer = async () => {
  try {
    await pool.query("SELECT 1");

    console.log("Conexion con MySQL establecida correctamente");

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en el puerto ${PORT}`);
    })
  } catch(error) {
    console.error("Error al conectar con MySQL:", error.message);
    process.exit(1);
  }
};

startServer();