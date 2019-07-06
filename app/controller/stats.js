var operations = require('../db/operations');

var stat = {};

stat.find = function (req, res) {
    console.log("----------- Find");
    operations.find("pruebajv", "mutant", {}).then(function (value) {
        console.log(value);
        res.status(200).json(value);
    });
};

module.exports = stat;