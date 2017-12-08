import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('social-iconlist', 'Integration | Component | social iconlist', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{social-iconlist}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#social-iconlist}}
      template block text
    {{/social-iconlist}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
