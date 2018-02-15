import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { next } from '@ember/runloop'

moduleForComponent('embed-button', 'Integration | Component | embed button', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{embed-button}}`);

  assert.equal(this.$('.embed-button__button').length, 1);
});

test('it shows the popup when you click the button', function(assert) {
  this.render(hbs`{{embed-button}}`);
  assert.equal(this.$('.embed-button__embed-popup').length, 0, 'the popup should begin hidden');

  this.$('.embed-button__button').click();
  assert.equal(this.$('.embed-button__embed-popup').length, 1,  'the popup should appear when you click the button');
});


test('it hides the popup when you click the button', function(assert) {
  this.render(hbs`{{embed-button showEmbed=true}}`);
  assert.equal(this.$('.embed-button__embed-popup').length, 1, 'the popup should begin visible');

  next(() => {
    this.$('.embed-button__button').click();
    next(() => {
      assert.equal(this.$('.embed-button__embed-popup').length, 0,  'the popup should hide when you click the button');
    });
  });
});
