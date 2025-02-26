const sqlite3 = require('sqlite3').verbose()
const path = require('path')
const fs = require('fs')

// Ruta donde se guardará la base de datos
const dbPath = path.resolve(__dirname, 'users.db')

// Verifica si la carpeta existe, si no, la crea
if (!fs.existsSync(path.dirname(dbPath))) {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })
}

// Conectar con SQLite
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con SQLite:', err.message)
  } else {
    console.log('Conectado a SQLite.')
  }
})

// Crear la tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    gender TEXT NOT NULL,
    country TEXT NOT NULL,
    address TEXT,
    email TEXT,
    numberPhone TEXT
)`, (err) => {
  if (err) {
    console.error('Error al crear la tabla:', err.message)
  } else {
    console.log('Tabla "users" lista.')
  }
})

module.exports = db
