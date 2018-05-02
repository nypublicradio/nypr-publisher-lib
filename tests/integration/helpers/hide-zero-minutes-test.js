import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

module('helper:hide-zero-minutes', function(hooks) {
  setupRenderingTest(hooks);

  test('it hides the minutes place if minutes are zero', async function(assert) {
    let date = moment().set({hours: 10, minutes: 0});
    this.set('inputValue', date);

    await render(hbs`{{hide-zero-minutes inputValue}}`);

    assert.equal(this.$().text().trim(), '10 am');
  });

  test('it shows the minutes place if minutes are not zero', async function(assert) {
    let date = moment().set({hours: 10, minutes: 10});
    this.set('inputValue', date);

    await render(hbs`{{hide-zero-minutes inputValue}}`);

    assert.equal(this.$().text().trim(), '10:10 am');
  });
});
