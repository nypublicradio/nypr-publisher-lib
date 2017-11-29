import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('remove-leading-slash', 'helper:remove-leading-slash', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', '/1234');

  this.render(hbs`{{remove-leading-slash inputValue}}`);

  assert.equal(this.$().text().trim(), '1234');
});
