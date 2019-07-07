const mutantCtrl = require('../controller/mutant');
const statsCtrl = require('../controller/stats');

/**
  * initializationRoutes
  * @param {*} app
  * Metodo que define las rutas y define el controlador asociado a la ruta
**/
exports.initializationRoutes = function (app) {
    app.post('/mutant', (req, res, next) => {
        mutantCtrl.isMutant(req, res);
    });

    app.get('/stats', (req, res, next) => {
        statsCtrl.stats(req, res);
    });
}