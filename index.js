const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const db = require('./app/db/db');
const routes = require('./app/route/route');

const PORT = 4200;

db.openConnection();  

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

routes.initializationRoutes(app);

console.log("pid", process.pid);
 
/**
  * Manejo de eventos del S.O donde se maneja la caida de MS y se cierra la conexión abierta a MongoDB
**/

process.on('SIGTERM', function () {
  console.log("SIGTERM Se cierra proceso de node");
  db.closeConnection();
  process.exit(0);
});
 
process.on('SIGINT', function () {
  console.log("SIGINT Se cierra proceso de node");
  db.closeConnection();
  process.exit(0);
});

module.exports = {
  app
};