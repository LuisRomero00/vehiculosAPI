const pool = require("../config/database");

const getAllAutos = async () => {
    const [rows] = await pool.query("SELECT * FROM autos;");
    console.log(rows)
    return rows;
};

const createAuto = async (id_placa, marca, modelo) => {
  const query = `
    INSERT INTO autos (id_placa, marca, modelo)
    VALUES (?, ?, ?);
  `;

  const [result] = await pool.query(query, [
    id_placa,
    marca,
    modelo
  ]);

  return result;
};

module.exports = {getAllAutos, createAuto};