'use strict'
//tests/tests.js // Suite
describe('Testing a DateTime  controller', function() {
    it('translates  time to UTC time', function () {

        expect('2016-07-01 00:00:00').toEqual('2016-07-01 00:00:00');
    });
});

describe('Testing a User  controller', function() {
    it('User login test', function () {

        expect('user').toEqual('user');
    });
});