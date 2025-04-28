# Proyecto PPS Backend - Bruno Diego
Este proyecto esta desarrollado con Node.js y Express, usando SQLite3 como base de datos.

Realizamos una API REST para la gestión de usuarios con operaciones CRUD y filtrado por género y país.

## Instalación y ejecución

Estos pasos se deben realizar si se desea probar el proyecto de manera local, el mismo está alojado en render.

### Requisitos previos

- Tener Node.js instalado
- Tener SQLite3 instalado

### Pasos para ejecutar el backend

1. Clonar el repositorio

```bash
git clone https://github.com/DiegoBruno-Dev/PPSBackendAPI.git
```

2. Instalar las dependencias

```bash
npm install
```

3. Iniciar el servidor

```bash
npm run start
```

El servidor se ejecutará en http://localhost:3000 por defecto.

Pero para los testeos es recomendable usar el link de render donde está subido el proyecto `https://ppsbackendapi.onrender.com`

## Endpoints disponibles

### Obtener todos los usuarios

**GET** `/api/v1/users`

Ejemplo de respuesta:

```
{
  "status": 200,
  "data": [
    { "id": 1, "name": "Luciano Costa", "gender": "male", "country": "Mexico", "email": "Luciano@gmail.com" },
    { "id": 2, "name": "Laura Monica", "gender": "female", "country": "Mexico", "email": "Laura@gmail.com" }
  ]
}
```

### Obtener un usuario por ID

**GET** `/api/v1/users/:id`

Ejemplo de respuesta:

```
{
  "status": 200,
  "data": { "id": 1, "name": "Luciano Costa", "gender": "male", "country": "Mexico", "email": "Luciano@gmail.com"}
}
```

### Crear un usuario

**POST** `/api/v1/users`

Body (JSON):
```
{
  "name": "Diego Bruno",
  "gender": "male",
  "country": "Argentina",
  "address": "Argentina 213",
  "email": "Diego@gmail.com",
  "numberPhone": "+54212195959"
}
```
Ejemplo de respuesta:
```
{
  "status": 201,
  "message": "Usuario creado",
  "userId": 5
}
```

### Actualizar un usuario

**PUT** `/api/v1/users/:id`

Body (JSON):
```
{
  "name": "Diego Bruno editado",
  "gender": "male",
  "country": "Argentina",
  "address": "Argentina 999",
  "email": "diego.new@gmail.com",
  "numberPhone": "+54222222222"
}
```
Ejemplo de respuesta:
```
{
  "status": 200,
  "message": "Usuario actualizado"
}
```

### Eliminar un usuario

**DELETE** `/api/v1/users/:id`

Ejemplo de respuesta:
```
{
  "status": 200,
  "message": "Usuario eliminado"
}
```

### Buscar usuarios por país o género

**GET** `/api/v1/users/search?gender=male&country=Mexico`

Ejemplo de respuesta:
```
{
  "status": 200,
  "data": [
    { "id": 1, "name": "Luciano Costa", "gender": "male", "country": "Mexico", "email": "Luciano@gmail.com" }
  ]
}
```

