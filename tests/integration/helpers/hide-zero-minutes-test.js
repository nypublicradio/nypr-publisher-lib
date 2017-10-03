
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('hide-zero-minutes', 'helper:hide-zero-minutes', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '1234');

  this.render(hbs`{{hide-zero-minutes inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});

