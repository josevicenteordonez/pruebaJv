var statsModel = require('../model/stats');

var statsCtrl = {};

statsCtrl.stats = async function (req, res) {

    var stats = await statsModel.stats();

    res.status(200).json(stats);
    
};

module.exports = statsCtrl;