const helloService = require("../services/hello.service");

/*const getHello = (req, res) => {
    const response = helloService.getHelloMessage();

    res.status(200).json(response);
};*/

const getHello = async (req, res, next) =>{
    try {
        const response = await helloService.getHelloMessage();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
}

//Esto es un error de prueba, borrar despues
/*const getHello = (req, res, next) => {
    next(new Error("Error de prueba"))
}*/ 

module.exports = {
    getHello 
}