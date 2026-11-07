const pool = require("../config/database");

const getAllAutos = async () => {
    const [rows] = await pool.query("SELECT * FROM autos;");
    console.log(rows)
    return rows;
};

const getAutoByPlaca = async (id_placa) => {
  const query = `
    SELECT * FROM autos
    WHERE id_placa = ?;
  `;
  const [rows] = await pool.query(query, [id_placa]);

  return rows[0] || null;
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

const updateAuto = async (id_placa, marca, modelo) => {
  const query = `
    UPDATE autos
    SET marca = ?, modelo = ?
    WHERE id_placa = ?
  `;

  const [result] = await pool.query(query, [
    marca,
    modelo,
    id_placa
  ]);

  return result
}

const deleteAuto = async (id_placa) => {
  const query = `
    DELETE FROM autos
    WHERE id_placa = ?
  `;

  const [result] = await pool.query(query, [id_placa]);

  return result;
}

module.exports = {getAllAutos, getAutoByPlaca, createAuto, updateAuto, deleteAuto};