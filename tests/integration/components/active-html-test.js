import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | active-html', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{active-html}}`);
    assert.equal(this.element.textContent.trim(), '');
  });

  test('it renders html', async function(assert) {
    let html = '<div class="target">test</div>'
    this.set('html', html);
    await render(hbs`{{active-html html=html}}`);
    let contents = find('.target');
    assert.equal(contents.textContent.trim(), 'test');
  });

  test('it renders', async function(assert) {
    let html = `<div id="test-target">test</div><script>document.querySelector('#test-target').innerHTML = 'changed'</script>`
    this.set('html', html);
    await render(hbs`{{active-html html=html}}`);
    let contents = find('.target');
    assert.equal(contents.textContent.trim(), 'changed');
  });

});
