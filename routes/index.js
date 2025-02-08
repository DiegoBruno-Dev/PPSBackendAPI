const express = require("express");

const router = express.Router();

//Rutas
//const sample = require("./sample");


//Rutas de prueba
//router.use("/sample", sample);

//Rutas por defecto
router.get("*", (req, res) => {
  res.json({
    status: 404,
    msg: "Endpoint Not Found",
  });
});

module.exports = router;