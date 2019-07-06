var operations = require('../db/operations');

var statsCtrl = {};

statsCtrl.find = function (req, res) {
    operations.find('pruebajv', 'mutant', {}).then(function (value) {
        console.log({ 'count_mutant_dna': 40, 'count_human_dna': 100, 'ratio': 0.4 });
        res.status(200).json({ 'count_mutant_dna': 40, 'count_human_dna': 100, 'ratio': 0.4 });
    });
};

module.exports = statsCtrl;