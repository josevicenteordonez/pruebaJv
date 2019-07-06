const MongoClient = require("mongodb").MongoClient;
 
// Variable para crear una sola instancia de la conexión a MongoDB
var state = {
    db: null
};
 
// String de conexion para la base de datos MongoDB
const url = "mongodb://localhost:27017";

/**
  * openConnection
  * Metodo que abre la conexion hacia MongoDB
**/
exports.openConnection = function () {
    if (state.db) {
        return;
    }
    var options = {
        poolSize: 40
    };
 
    MongoClient.connect(url, options, function (err, db) {
 
        if (err) {
            console.log("Error Conexión MongoDB", err);
            return;
        }
 
        console.log(" --------->  Crea conexion MongoDB");
 
        // se asigna la conexión la primera vez que se levanta
        state.db = db;
 
        // se manejan los distintos eventos en el tiempo que esta establecida la conexión
        state.db.on("close", function (reason) {
            console.log(" --------->  Conexion MongoDB esta cerrada", reason);
        });
 
        state.db.on("error", function (reason) {
            console.log(" ---------> Conexion MongoDB con error", reason);
        });
 
        state.db.on("reconnect", function (info) {
            console.log(" ---------> Conexion MongoDB reconectada y reautenticada", info);
        });
 
        state.db.on("timeout", function (err) {
            console.log(" ---------> Conexion MongoDB timeout", err);
        })
 
        return;
    });
};
 
/**
  * closeConnection
  * Metodo que cierra la conexion hacia MongoDB
**/
exports.closeConnection = function () {
    if (state.db) {
        state.db.close(function (err, result) {
            state.db = null;
            return;
        });
    }
};

/**
  * getConnection
  * Metodo que obtiene la conexion existe con MongoDB
**/
exports.getConnection = function () {
    return state.db;
};
