const sinon = require('sinon');
const statsController = require('../controller/stats');
const statsModel = require('../model/stats');

describe('Stats Controller', function () {
    let req = {};
    let res = {};
    let expectedResult;

    describe('stats function', function () {
        beforeEach(function () {
            res = {
                "count_mutant_dna": 40,
                "count_human_dna": 100,
                "ratio": 0.4
            };
        });

        it('should return stats', sinon.test(function () {
            expectedResult = req;
            this.stub(statsModel, 'stats').yields(null, expectedResult);
            statsController.stats(req, res);
            /*sinon.assert.calledWith(Vehicle.create, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ model: req.body.model }));
            sinon.assert.calledWith(res.json, sinon.match({ manufacturer: req.body.manufacturer }));*/
        }));
    });
});