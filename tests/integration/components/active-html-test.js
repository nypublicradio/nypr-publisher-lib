import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | active-html', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{active-html}}`);
    assert.equal(this.$().text().trim(), '');
  });

  test('it renders html', async function(assert) {
    let html = '<div class="target">test</div>'
    this.set('html', html);
    await render(hbs`{{active-html html=html}}`);
    let contents = this.$('.target');
    assert.equal(contents.text().trim(), 'test');
  });

  test('it runs scripts', async function(assert) {
    let html = `<div id="target">test</div><script>document.querySelector('#target').innerHTML = 'changed';</script>`
    this.set('html', html);
    await render(hbs`{{active-html html=html}}`);
    let contents = this.$('#target');
    assert.equal(contents.text().trim(), 'changed');
  });

  test('it handles changes to html', async function(assert) {
    let html = '<div class="target">test</div>'
    this.set('html', html);
    await render(hbs`{{active-html html=html}}`);

    let html2 = '<div class="target2">test2</div>'
    this.set('html', html2);
    let contents = this.$('.target2');
    assert.equal(contents.text().trim(), 'test2');
  });
});

