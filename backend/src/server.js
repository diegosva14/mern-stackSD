// Carga las variables de entorno desde un archivo .env
require('dotenv').config()

// Importaciones necesarias para usar express, mongoose, cors, y path.
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
const noteRouter = require('./routes/noteRouter')
const path = require('path')

// Creación de la aplicación express.
const app = express()
// Habilita CORS para permitir que el cliente acceda al servidor desde diferentes dominios.
app.use(cors())
// Habilita la capacidad de parsear JSON, para que el servidor pueda entender cuando le envíen este tipo de datos.
app.use(express.json())

// Configuración de las rutas que manejarán las solicitudes para usuarios y notas.
app.use('/users', userRouter)
app.use('/api/notes', noteRouter)

// Conexión a MongoDB, usando la URI proporcionada por la variable de entorno o una local.
const URI = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : 'mongodb://localhost/databasetest';
mongoose.connect(URI, {
    useNewUrlParser: true, // Opción para manejar la nueva forma de parsear las URLs de MongoDB.
});

// Establece una conexión con la base de datos y muestra un mensaje en consola cuando se conecta.
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('DB is now connected');
});

// Configura el servidor para que escuche en el puerto definido por la variable de entorno PORT o, por defecto, el puerto 4000.
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
