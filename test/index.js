const chai = require('chai');
const assert = chai.assert;
const should = chai.should();
const calc = require('../src/app/components/Calculator/calculate');

describe('calculate', function() {
    it('Regular pay for 3 hours = $36.00', () => {
        let data = calc({ start: '5:00pm', end: '8:00pm' });
        let { pay } = data;

        assert.equal(pay.reg, 36);
    });

    it('Bedtime pay for 2 hours = $16.00', () => {
        let data = calc({ start: '8:00pm', end: '10:00pm' });
        let { pay } = data;

        assert.equal(pay.bed, 16);
    });

    it('Overtime pay for 1 hours = $12.00', () => {
        let data = calc({ start: '12:00am', end: '1:00am' });
        let { pay } = data;

        assert.equal(pay.over, 16);
    });

    it('Total pay for 11 hours = $132.00', () => {
        let data = calc({ start: '5:00pm', end: '4:00am' });
        let { pay } = data;

        assert.equal(pay.total, 132);
    });

    it('Total hours from 5pm - 4am = 11', () => {
        let data = calc({ start: '5:00pm', end: '4:00am' });
        let { hours } = data;

        assert.equal(hours.total, 11);
    });

    it('No calculation if start time is later than end time', () => {
        let data = calc({ start: '8:00pm', end: '5:00pm' });
        let { error } = data;

        console.log(`\n    ${error.message}`);

        should.exist(error);
    });

    it('No calculation if start time is less than 5:00pm', () => {
        let data = calc({ start: '4:00pm', end: '9:00pm' });
        let { error } = data;

        console.log(`\n    ${error.message}`);

        should.exist(error);
    });

    it('No calculation if end time is greater than 4:00am', () => {
        let data = calc({ end: '5:00am', start: '9:00pm' });
        let { error } = data;

        console.log(`\n    ${error.message}`);

        should.exist(error);
    });
});
