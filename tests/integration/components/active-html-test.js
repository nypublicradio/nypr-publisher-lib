import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('Integration | Component | active-html', {
  integration: true
});

test('it renders', async function(assert) {
  this.render(hbs`{{active-html}}`);
  assert.equal(this.$().text().trim(), '');
});

test('it renders html', async function(assert) {
  let html = '<div class="target">test</div>'
  this.set('html', html);
  this.render(hbs`{{active-html html=html}}`);
  let contents = this.$('.target');
  assert.equal(contents.text().trim(), 'test');
});

test('it runs scripts', async function(assert) {
  let html = `<div id="target">test</div><script>document.querySelector('#target').innerHTML = 'changed';</script>`
  this.set('html', html);
  this.render(hbs`{{active-html html=html}}`);
  let contents = this.$('#target');
  assert.equal(contents.text().trim(), 'changed');
});

