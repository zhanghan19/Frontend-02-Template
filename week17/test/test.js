var assert = require('assert');
// var add = require('../add.js').add;
// var mul = require('../add.js').mul;
import {add, mul} from "../add.js"


// 分组机制
describe('add function testing', function() {
  it('1+2 should be 3', function() {
    assert.equal(add(1,2), 3);
  });
  it('2+2 should be 4', function() {
    assert.equal(add(2,2), 4);
  });
  it('2*2 should be 8', function() {
    assert.equal(mul(2,2), 4);
  });
});