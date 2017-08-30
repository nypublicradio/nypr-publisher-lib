import { capitalizeWord } from 'nypr-publisher-lib/helpers/capitalize-word'
import { module, test } from 'qunit';

module('Unit | Helper | capitalize-word');

// Replace this with your real tests.
test('it capitalizes words', function(assert) {
  let result = capitalizeWord(['word']);
  assert.deepEqual(result, "Word");
});
