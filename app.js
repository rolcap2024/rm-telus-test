const express = require('express');
const users = require('./users.route')

// Configuracion inicial
const app = express();
const PORT = process.env.PORT || 8200;

// Middleware para JSON requests
app.use(express.json());

// Definir ruta para usuarios
app.use('/users', users);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT},  process ID: ${process.pid}`);
});
