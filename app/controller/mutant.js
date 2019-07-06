var mutantModel = require('../model/mutant');

var mutantCtrl = {};

mutantCtrl.isMutant = function (req, res) {

    var isMutant = mutantModel.isMutant(req.body.dna);

    if (isMutant) {
        res.status(200).json("200");
    } else {
        res.status(200).json("403");
    }
};

module.exports = mutantCtrl;