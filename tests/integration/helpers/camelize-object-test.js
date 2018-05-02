import { camelizeObject } from 'nypr-publisher-lib/helpers/camelize-object';
import { module, test } from 'qunit';

module('Unit | Helper | camelize-object', function() {
  // Replace this with your real tests.
  test('it camelizes object', function(assert) {
    let result = camelizeObject({ 'foo-bar': true, foo_baz: true });
    assert.deepEqual(result, {fooBar: true, fooBaz: true});
  });
});
