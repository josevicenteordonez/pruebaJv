var operations = require('../db/operations');

var mutant = {};

mutant.find = function (req, res) {
    console.log("----------- Find");
    operations.find("pruebajv", "mutant", {}).then(function (value) {
        console.log(value);
        res.status(200).json(value);
    });
};

module.exports = mutant;