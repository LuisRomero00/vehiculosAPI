const express = require("express");
const router = express.Router();

const autosController = require("../controllers/autos.controller");
router.get("/", autosController.getAllAutos);
router.post("/", autosController.createAuto);
router.get("/:id_placa", autosController.getAutoByPlaca);
router.put("/:id_placa", autosController.updateAuto)
router.delete("/:id_placa", autosController.deleteAuto)

module.exports = router;