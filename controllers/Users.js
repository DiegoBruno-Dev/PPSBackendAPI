const { request, response } = require('express')
const db = require('../db/database.js')

// Obtener todos los usuarios
const getUsers = (req = request, res = response) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error('Error al obtener usuarios:', err.message)
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
    res.status(200).json({ status: 200, data: rows })
  })
}

// Obtener usuario por ID
const getUserById = (req = request, res = response) => {
  const { id } = req.params

  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error('Error al obtener usuario:', err.message)
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
    if (!row) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.status(200).json({ status: 200, data: row })
  })
}

// Buscar usuarios por país o género
const searchUsers = (req = request, res = response) => {
  const { country, gender } = req.query;

  console.log('Parámetro de género recibido: ', gender); 
  let query = 'SELECT * FROM users WHERE 1=1';
  const params = [];

  if (country) {
    query += ' AND LOWER(country) = LOWER(?)';
    params.push(country);
  }

  if (gender) {
    const normalizedGender = gender.toLowerCase();
    if (normalizedGender !== 'male' && normalizedGender !== 'female') {
      return res.status(400).json({ error: 'Género no válido' });
    }
    query += ' AND LOWER(gender) = LOWER(?)';
    params.push(normalizedGender);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error en la búsqueda de usuarios:', err.message);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: 'No se encontraron usuarios con esos criterios' });
    }

    res.status(200).json({ status: 200, data: rows });
  });
};


// Crear un usuario
const createUser = (req = request, res = response) => {
  let { name, gender, country, address, email, numberPhone } = req.body;

  if (!name || !gender || !country) {
    return res.status(400).json({ error: 'Los campos name, gender y country son obligatorios' });
  }

  gender = gender.toLowerCase() === 'masculino' ? 'male' : 'female';

  db.run(
    'INSERT INTO users (name, gender, country, address, email, numberPhone) VALUES (?, ?, ?, ?, ?, ?)',
    [name, gender, country, address, email, numberPhone],
    function (err) {
      if (err) {
        console.error('Error al insertar usuario:', err.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      res.status(201).json({ status: 201, message: 'Usuario creado', userId: this.lastID });
    }
  );
}

// Actualizar usuario por ID
const updateUser = (req = request, res = response) => {
  let { name, gender, country, address, email, numberPhone } = req.body;
  const { id } = req.params;

  // Normalizar el género
  gender = gender.toLowerCase() === 'masculino' ? 'male' : 'female';

  db.run(
    'UPDATE users SET name = ?, gender = ?, country = ?, address = ?, email = ?, numberPhone = ? WHERE id = ?',
    [name, gender, country, address, email, numberPhone, id],
    function (err) {
      if (err) {
        console.error('Error al actualizar usuario:', err.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.status(200).json({ status: 200, message: 'Usuario actualizado' });
    }
  );
}

// Eliminar usuario por ID
const deleteUser = (req = request, res = response) => {
  const { id } = req.params

  db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
    if (err) {
      console.error('Error al eliminar usuario:', err.message)
      return res.status(500).json({ error: 'Error interno del servidor' })
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    res.status(200).json({ status: 200, message: 'Usuario eliminado' })
  })
}

module.exports = {
  getUsers,
  getUserById,
  searchUsers,
  createUser,
  updateUser,
  deleteUser
}
