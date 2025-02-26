const express = require('express')
const usersRoutes = require('./routes/Users')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/api/v1/users', usersRoutes)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
