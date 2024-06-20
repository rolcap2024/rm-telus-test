const NodeCache = require('node-cache');
const express = require('express');
const axios = require('axios');
const router = express.Router();

// JSONPLACEHOLDER API URL 
const placeholderApiUrl = 'https://jsonplaceholder.typicode.com/users/';

// Cache para users
// Como no platicamos tiempo de expiracion en la cache, me di cuenta que pude haber usado un array local
const cache = new NodeCache();

// GET /users/:id
router.get('/:id', async (req, res) => {
  const userId = req.params.id;

  // Revisar cache primero
  if (cache.has(userId)) {
    const cachedUser = cache.get(userId);
    console.log(`user ${userId} was cached.`);
    return res.json(cachedUser);
  }

  try {
    // Axios request para jsonplaceholder API
    const response = await axios.get(`${placeholderApiUrl}/${userId}`);
    const user = response.data;

    // Guardar en cache user
    console.log(`user ${userId} was not cached`);
    cache.set(userId, user);

    return res.json(user);
  } catch (error) {
    // Manejo de usuario no encontrado.
    return res.status(404).json({ error: 'User not found' });
  }
});

// Ruta default
router.get('/', (req, res) => {
  res.status(501).send('PAGE NOT IMPLEMENTED');
});

module.exports = router;