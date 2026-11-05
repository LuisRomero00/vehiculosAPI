const errorHandler = (err, req, res, next) => {
  console.error(err);

  if(err.code === "ER_DUP_ENTRY"){
    return res.status(409).json({
      mesage: "Ya se registro algo con esos datos"
    })
  }

  res.status(err.status || 500).json({
    message:err.status
    ? err.message
    : "Error interno del servidor"
  });
};

module.exports = errorHandler;
