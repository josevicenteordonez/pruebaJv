const sinon = require('sinon');
const operations = require('../db/operations');
const statsModel = require('../model/stats');

describe('Stats Model', function () {

    describe('stats function', function () {
        beforeEach(function () {
            res = {};
        });

        it('should return stats', sinon.test(function () {
            expectedResult = {};
            this.stub(operations, 'find').yields(null, expectedResult);
            statsModel.stats();
            /*sinon.assert.calledWith(Vehicle.create, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ model: req.body.model }));
            sinon.assert.calledWith(res.json, sinon.match({ manufacturer: req.body.manufacturer }));*/
        }));
    });
});