import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import moment from 'moment';

moduleForComponent('hide-zero-minutes', 'helper:hide-zero-minutes', {
  integration: true
});

test('it hides the minutes place if minutes are zero', function(assert) {
  let date = moment().set({hours: 10, minutes: 0});
  this.set('inputValue', date);

  this.render(hbs`{{hide-zero-minutes inputValue}}`);

  assert.equal(this.$().text().trim(), '10 am');
});

test('it shows the minutes place if minutes are not zero', function(assert) {
  let date = moment().set({hours: 10, minutes: 10});
  this.set('inputValue', date);

  this.render(hbs`{{hide-zero-minutes inputValue}}`);

  assert.equal(this.$().text().trim(), '10:10 am');
});
