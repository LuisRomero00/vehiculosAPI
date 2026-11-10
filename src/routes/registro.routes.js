const express = require("express");
const router = express.Router();

const registroController = require("../controllers/registro.controller");

router.get("/", registroController.getAllRegistros);
router.post("/", registroController.createRegistro);
router.patch("/salida/:placa_id", registroController.updateSalida);

module.exports = router;