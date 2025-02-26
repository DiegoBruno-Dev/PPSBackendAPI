const db = require('../db/database')

// Obtener todos los usuarios
const getUsers = (callback) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    callback(err, rows)
  })
}

// Obtener un usuario por ID
const getUserById = (id, callback) => {
  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    callback(err, row)
  })
}

// Insertar usuario
const insertUser = ({ name, gender, country, address, email, numberPhone }, callback) => {
  db.run(
    'INSERT INTO users (name, gender, country, address, email, numberPhone) VALUES (?, ?, ?, ?, ?, ?)',
    [name, gender, country, address, email, numberPhone],
    function (err) {
      callback(err, { id: this.lastID })
    }
  )
}

module.exports = { getUsers, getUserById, insertUser }
