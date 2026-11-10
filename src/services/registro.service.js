const pool = require("../config/database");

const getAllRegistros = async (filters = {}) => {
  
  let query = "";
  let params = [];

  if (filters.fecha_entrada){
        query = `
            SELECT *
            FROM registro
            WHERE DATE(entrada) = ?
        `;

        params = [filters.fecha_entrada]; 
  
  } else if (filters.fecha_salida) {
        query = `
            SELECT *
            FROM registro
            WHERE DATE(salida) = ?
        `;
        params = [filters.fecha_salida];

  } else if (filters.placa_id) {
        query = `
            SELECT *
            FROM registro
            WHERE placa_id = ?
        `;
        params = [filters.placa_id];

  } else if(filters.motorista) {
        query = `
            SELECT *
            FROM registro
            WHERE motorista LIKE ?
        `;
        params = [`%${filters.motorista}%`];

  } else {
        query = `
            SELECT *
            FROM registro
        `;
  }

  const [rows] = await pool.query(query, params);

  return rows;
  
};

const createRegistro = async (
    placa_id,
    motorista,
    kilometraje,
    entrada
) => {
    const queryPrueba = `
        SELECT id
        FROM registro
        WHERE placa_id = ?
        AND salida IS NULL
    `
    const [datos] = await pool.query(queryPrueba, [placa_id]);

    if (datos.length > 0){
        const error = new Error("Este vehiculo ya esta dentro del establecimiento")
        
        error.status = 409;
        throw error;
    }

    const query = `
        INSERT INTO registro (
            placa_id,
            motorista,
            kilometraje,
            entrada
        )
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.query(query, [
        placa_id,
        motorista,
        kilometraje,
        entrada
    ]);

    return result;  
}

const updateSalida = async (placa_id, salida) => {
    const query = `
        UPDATE registro
        SET salida = ?
        WHERE placa_id = ?
        AND salida IS NULL
    `;

    const [result] = await pool.query(query, [salida, placa_id]);

    return result;
};



module.exports = {
  getAllRegistros, createRegistro, updateSalida
};