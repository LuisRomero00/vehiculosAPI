const registroService = require("../services/registro.service");


const getAllRegistros = async (req, res, next) => {
    
    try {
        const filters = req.query;

        const allowedFilters = [
            "fecha_entrada",
            "fecha_salida",
            "placa_id",
            "motorista"
        ];

        const invalidFilters = Object.keys(filters).filter(
            filter => !allowedFilters.includes(filter)
        );

        if (invalidFilters.length > 0) {
            return res.status(400).json({
                message: "Se enviaron filtros no permitidos",
                invalidFilters
            });
        }

        const filterCount = Object.keys(filters).length;

        if (filterCount > 1) {
            return res.status(400).json({
                message: "Solo se permite un filtro por consulta"
            });
        }

        const registros = await registroService.getAllRegistros(filters);
        
        res.status(200).json(registros)

    } catch (error) {
        next(error);
    }
}

const createRegistro = async (req, res, next) => {
    try {
        const {placa_id, motorista, kilometraje, entrada} = req.body;

        if (!placa_id || !motorista || !kilometraje || !entrada){
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            })
        }

        const result = await registroService.createRegistro(
            placa_id, motorista, kilometraje, entrada
        );

        res.status(201).json({
            message: "Registro creado correctamente",
            id: result.insertId
        });

    } catch (error) {
        next(error)
    }
}

const updateSalida = async (req, res, next) => {
    try {
        const {placa_id} = req.params;
        const {salida} = req.body;

        if(!salida){
            return res.status(400).json({
                message: "La fecha y hora de salida son obligatorias"
            });
        }

        const result = await registroService.updateSalida(placa_id, salida);

        if(result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se encuentra un registro pendiente de salida para el carro"
            })
        }

        res.status(200).json({
            message: "Salida registrada correctamente",
            placa_id
        })
    } catch (error) {
        next(error)
    }
}
module.exports = {getAllRegistros, createRegistro, updateSalida};