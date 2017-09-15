import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('normalize-for-sorting', 'helper:normalize-for-sorting', {
  integration: true
});


// Replace this with your real tests.
test('it lowercases the string', function(assert) {
  this.render(hbs`{{normalize-for-sorting 'TiTlE'}}`);
  const expected = 'title';
  assert.equal(this.$().text().trim(), expected);
});

test('it trims whitespace', function(assert) {
  this.render(hbs`{{normalize-for-sorting '  test title  '}}`);
  const expected = 'test title';
  assert.equal(this.$().text().trim(), expected);
});

test('it removes articles', function(assert) {
  this.render(hbs`{{normalize-for-sorting 'The Test'}}`);
  const expected = 'test';
  assert.equal(this.$().text().trim(), expected);
});

test('it does not remove parts of words that match articles', function(assert) {
  this.render(hbs`{{normalize-for-sorting 'These Are Tests'}}`);
  const expected = 'these are tests';
  assert.equal(this.$().text().trim(), expected)
});

test('it does not remove articles in the middle of titles', function(assert) {
  this.render(hbs`{{normalize-for-sorting 'Concerts from the Library of Congress'}}`);
  const expected = 'concerts from the library of congress';
  assert.equal(this.$().text().trim(), expected);
});
