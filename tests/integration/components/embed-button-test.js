import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { next } from '@ember/runloop'

module('Integration | Component | embed button', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{embed-button}}`);

    assert.equal(this.$('.embed-button__button').length, 1);
  });

  test('it shows the popup when you click the button', async function(assert) {
    await render(hbs`{{embed-button}}`);
    assert.equal(this.$('.embed-button__embed-popup').length, 0, 'the popup should begin hidden');

    this.$('.embed-button__button').click();
    assert.equal(this.$('.embed-button__embed-popup').length, 1,  'the popup should appear when you click the button');
  });


  test('it hides the popup when you click the button', async function(assert) {
    await render(hbs`{{embed-button showEmbed=true}}`);
    assert.equal(this.$('.embed-button__embed-popup').length, 1, 'the popup should begin visible');

    next(() => {
      this.$('.embed-button__button').click();
      next(() => {
        assert.equal(this.$('.embed-button__embed-popup').length, 0,  'the popup should hide when you click the button');
      });
    });
  });
});
