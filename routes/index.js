const express = require('express');

const router = express.Router();

// Rutas
// const sample = require("./sample");
const Users = require("./Users");

router.use("/api/v1/users",Users);


// Rutas por defecto
router.get('*', (req, res) => {
  res.json({
    status: 404,
    msg: 'Endpoint Not Found'
  })
});

module.exports = router;
