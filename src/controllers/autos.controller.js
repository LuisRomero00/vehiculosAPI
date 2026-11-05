const autosService = require("../services/autos.service");


const getAllAutos = async (req, res, next) => {
    
    try {
        const autos = await autosService.getAllAutos();
        res.status(200).json(autos)
    } catch (error) {
        next(error);
    }
}

const createAuto = async (req, res, next) =>{
    try {
        const {id_placa, marca, modelo} = req.body;

        if (!id_placa || !marca || !modelo) {
            console.log("No puede faltar ningun dato")
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            });
        }

        //Aqui llamaremos al service para guardar el auto.
        const result = await autosService.createAuto(
            id_placa,
            marca,
            modelo
        );
        res.status(201).json({
            message: "Auto registrado correctamente",
            id_placa: id_placa
        });


    } catch (error) {
        next(error);
    }
};

module.exports = {getAllAutos, createAuto};