const statsModel = require('../model/stats');

const statsCtrl = {};

statsCtrl.stats = async function (req, res) {

    var stats = await statsModel.stats();

    res.status(200).json(stats);
    
};

module.exports = statsCtrl;