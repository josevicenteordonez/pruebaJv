var mutantModel = require('../model/mutant');

var mutantCtrl = {};

mutantCtrl.isMutant = async function (req, res) {

    var isMutant = await mutantModel.isMutant(req.body.dna);

    if (isMutant) {
        res.status(200).json("200");
    } else {
        res.status(403).json("403");
    }
};

module.exports = mutantCtrl;