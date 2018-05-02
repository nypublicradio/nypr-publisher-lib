import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('helper:normalize-for-sorting', function(hooks) {
  setupRenderingTest(hooks);


  // Replace this with your real tests.
  test('it lowercases the string', async function(assert) {
    await render(hbs`{{normalize-for-sorting 'TiTlE'}}`);
    const expected = 'title';
    assert.equal(this.$().text().trim(), expected);
  });

  test('it trims whitespace', async function(assert) {
    await render(hbs`{{normalize-for-sorting '  test title  '}}`);
    const expected = 'test title';
    assert.equal(this.$().text().trim(), expected);
  });

  test('it removes articles', async function(assert) {
    await render(hbs`{{normalize-for-sorting 'The Test'}}`);
    const expected = 'test';
    assert.equal(this.$().text().trim(), expected);
  });

  test('it does not remove parts of words that match articles', async function(assert) {
    await render(hbs`{{normalize-for-sorting 'These Are Tests'}}`);
    const expected = 'these are tests';
    assert.equal(this.$().text().trim(), expected)
  });

  test('it does not remove articles in the middle of titles', async function(assert) {
    await render(hbs`{{normalize-for-sorting 'Concerts from the Library of Congress'}}`);
    const expected = 'concerts from the library of congress';
    assert.equal(this.$().text().trim(), expected);
  });
});
