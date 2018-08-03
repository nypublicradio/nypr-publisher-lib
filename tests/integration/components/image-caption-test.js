import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | image caption', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{image-caption}}`);

    let text = this.$().text().replace(/\s\s+/g, ' ').trim();
    assert.equal(text, '');
  });

  test('it renders captions', async function(assert) {
    let image = {
      caption: "Great Photo"
    };
    this.set('image', image);
    await render(hbs`{{image-caption image=image}}`);

    let text = this.$().text().replace(/\s\s+/g, ' ').trim();
    assert.equal(text, 'Great Photo');
  });

  test('it renders credits', async function(assert) {
    let image = {
      creditsName:  "Loren Ipsson"
    };
    this.set('image', image);
    await render(hbs`{{image-caption image=image}}`);

    let text = this.$().text().replace(/\s\s+/g, ' ').trim();
    assert.equal(text, '( Loren Ipsson )');
  });

  test('it renders credits with sources', async function(assert) {
    let image = {
      creditsName:  "Loren Ipsson",
      source: {name: "World Photos"}
    };
    this.set('image', image);
    await render(hbs`{{image-caption image=image}}`);

    let text = this.$().text().replace(/\s\s+/g, ' ').trim();
    assert.equal(text, '( Loren Ipsson / World Photos )');
  });

  test('it renders captions and credits with sources', async function(assert) {
    let image = {
      caption: "Great Photo",
      creditsName:  "Loren Ipsson",
      source: {name: "World Photos"}
    };
    this.set('image', image);
    await render(hbs`{{image-caption image=image}}`);

    let text = this.$().text().replace(/\s\s+/g, ' ').trim();
    assert.equal(text, 'Great Photo ( Loren Ipsson / World Photos )');
  });
});
