const axios = require('axios')
const { request, response } = require('express')
const ResponseMessage = require('../models/ResponseMessage')
const ErrorMessage = require('../models/ErrorMessage')
const CustomStatusMessage = require('../models/CustomStatusMessage')

const URL = process.env.MOCKAPI_URL

// Función para obtener todos los usuarios
const getUsers = (req = request, res = response) => {
  axios.get(URL)
    .then((apiResponse) => {
      const { data = [] } = apiResponse
      res.status(200).json(ResponseMessage.from(data, 200))
    })
    .catch((error) => {
      console.error(error)
      res.status(400).json(ErrorMessage.from(error, 400))
    })
}

// Función para obtener un usuario por id

const getUserById = (req = request, res = response) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json(ErrorMessage.from(CustomStatusMessage.from(400, 'El id es requerido'), 400))
  }

  axios.get(`${URL}/${id}`)
    .then((apiResponse) => {
      const { data } = apiResponse
      if (!data) {
        return res.status(400).json(ErrorMessage.from(CustomStatusMessage.from(400, 'El id no existe'), 400))
      }
      res.status(200).json(ResponseMessage.from(data, 200))
    })
    .catch((error) => {
      console.error(error)
      res.status(400).json(ErrorMessage.from(error, 400))
    })
}

module.exports = {
  getUsers,
  getUserById
}
