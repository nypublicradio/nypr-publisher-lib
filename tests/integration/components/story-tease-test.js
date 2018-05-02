import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { faker } from 'ember-cli-mirage';

module('Integration | Component | story tease', function(hooks) {
  setupRenderingTest(hooks);

  const item = {
    title: 'foo',
    url: 'story/foo',
    tease: 'foo tease',
    audioDurationReadable: '1 min',
    dateLineDatetime: new Date(),
    imageMain: {template: faker.internet.avatar()},
    headers: {
      links: [{url: 'foo-link', title: 'foo link'}, {url: 'bar-link', title: 'bar link'}],
      brand: {title: 'Foo Show'}
    }
  };

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    this.set('item', item);

    await render(hbs`{{story-tease item=item}}`);
    
    assert.equal(this.$('[data-test-selector=story-tease-title]').text().trim(), 'foo');
    assert.ok(this.$('a[href="foo-link"]').length, 'header links are rendered');

    await render(hbs`{{story-tease item=item parentTitle='Foo Show'}}`);
    assert.notOk(this.$('a[href="foo-link"]').length, 'header links are not rendered');
  });
});
