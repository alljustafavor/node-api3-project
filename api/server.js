const express = require('express');
const cors = require('cors');
const users_router = require('./users/users-router.js');
const { logger } = require('./middleware/middleware.js');
const server = express();

server.use(express.json());

server.use(logger);
server.use('/api/users', users_router);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
