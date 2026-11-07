const errorHandler = (err, req, res, next) => {
  console.error(err);

  if(err.code === "ER_DUP_ENTRY"){
    return res.status(409).json({
      mesage: "Ya se registro algo con esos datos"
    })
  }
  
  if (err.code === "ER_ROW_IS_REFERENCED_2") {
    return res.status(409).json({
      message: "No se puede eliminar este auto porque tiene registros asociados"
    });
  }

  res.status(err.status || 500).json({
    message:err.status
    ? err.message
    : "Error interno del servidor"
  });
};

module.exports = errorHandler;
