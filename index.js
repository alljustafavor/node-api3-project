const server = require('./api/server.js');

const PORT = 9000;

server.listen(PORT, () => {
  console.log(`\n Server is running on http://localhost:${PORT}`);
});
