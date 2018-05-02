import {
  totalPages,
  calculateOffset,
  firstLessThan
} from 'dummy/utils/math-util';
import { module, test } from 'qunit';

module('Unit | Utility | math util', function() {
  test('calculate offset works', function(assert) {
    let result = calculateOffset(5, 2);
    assert.equal(result, 8);
  });

  test('firstLessThan works', function(assert) {
    let result = firstLessThan([1,2,3,4,5,6], 3);
    assert.equal(result, 4);
  });

  test('totalPages works', function(assert) {
    let result = totalPages(20, 5);
    assert.equal(result, 4);
  });
});
