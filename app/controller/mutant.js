var operations = require('../db/operations');
var mutantModel = require('../model/mutant');

var mutantCtrl = {};

mutantCtrl.isMutant = function (req, res) {

    var isMutant = mutantModel.isMutant(req.body.dna);

    if (isMutant) {

        var data = {
            'dna': req.body.dna,
            'isMutant': true,
            'createdAt': new Date()
        }

        operations.insert('pruebajv', 'mutant', data).then(function (value) {
            res.status(200).json("200");
        });

    } else {

        var data = {
            'dna': req.body.dna,
            'isMutant': false,
            'createdAt': new Date()
        }

        operations.insert('pruebajv', 'mutant', data).then(function (value) {
            res.status(200).json("403");
        });
    }
};

module.exports = mutantCtrl;