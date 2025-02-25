const { Router } = require('express')
const { getUsers, getUserById } = require('./../controllers/Users')

const rutas = Router()

// http://localhost:3000/api/v1/users
rutas.get('/', getUsers)

// http://localhost:3000/api/v1/users/id
rutas.get('/:id', getUserById)

module.exports = rutas
