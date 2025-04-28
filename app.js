const express = require('express')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

const indexRoutes = require('./routes/index')

app.use(express.json())

app.use('/', indexRoutes)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
