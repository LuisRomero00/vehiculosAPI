const pool = require("../config/database");
const autosService = require("../services/autos.service");


const getAllAutos = async (req, res, next) => {
    
    try {
        const autos = await autosService.getAllAutos();
        res.status(200).json(autos)
    } catch (error) {
        next(error);
    }
}

const getAutoByPlaca = async (req, res, next) => {
    try {
        const {id_placa} = req.params;

        const auto = await autosService.getAutoByPlaca(id_placa);

        if(!auto){
            return res.status(404).json({
                message: "No hay auto disponible con esa placa"
            });
        }

        res.status(200).json(auto);
    } catch (error) {
        next(error);
    }
}

const createAuto = async (req, res, next) => {
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

const updateAuto = async (req, res, next) => {
    try {
        const {id_placa} = req.params;
        const {marca, modelo} = req.body;

        if (!marca || !modelo) {
            return res.status(400).json({
                message: "La marca y modelo del vehiculo son obligatorios"
            })
        }

        const result = await autosService.updateAuto(
            id_placa,
            marca,
            modelo
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se encuentra un vehiculo con esa placa"
            })
        }

        res.status(200).json({
            message: "Auto actualizado correctamente",
            id_placa
        })
    } catch (error) {
        next(error)
    }
}

const deleteAuto = async (req, res, next) => {
    try {
        const {id_placa} = req.params;
        
        const result = await autosService.deleteAuto(id_placa);

        console.log(result)
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No existe un vehiculo con esa placa"
            });
        }

        res.status(200).json({
            message: "Auto eliminado correctamente",
            id_placa
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {getAllAutos, createAuto, getAutoByPlaca, updateAuto, deleteAuto};