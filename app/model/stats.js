var operations = require('../db/operations');

var statsModel = {};

statsModel.stats = function () {

    return new Promise(async (resolve, reject) => {

        var mutant = 0;
        var human = 0;

        await operations.find('pruebajv', 'mutant', { "isMutant": true }).then(function (value) {
            mutant = value.length;
        });

        await operations.find('pruebajv', 'mutant', { "isMutant": false }).then(function (value) {
            human = value.length;
        });

        resolve(
            {
                "count_mutant_dna": mutant,
                "count_human_dna": human,
                "ratio": ( mutant / (mutant + human))
            });

        return;
    });
}

module.exports = statsModel;