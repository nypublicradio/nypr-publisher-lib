import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('episode-list', 'Integration | Component | episode list', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{episode-list}}`);

  assert.equal(this.$().text().trim(), '');
});
