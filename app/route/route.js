const statsCtrl = require('../controller/stats');
const mutantCtrl = require('../controller/mutant');

/**
  * initializationRoutes
  * @param {*} app
  * Metodo que define las rutas y define el controlador asociado a la ruta
**/
exports.initializationRoutes = function (app) {
    app.post('/mutant', (req, res, next) => {
        statsCtrl.find(req, res);
    });

    app.get('/stats', (req, res, next) => {
        mutantCtrl.find(req, res);
    });
}