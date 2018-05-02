import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | download link', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    let story = ({audio: "http://example.com", title:"Story"})
    this.set('story', story)

    await render(hbs`{{download-link story=story}}`);

    assert.equal(this.$('.download-link').length, 1);
    assert.equal(this.$('.download-link').attr('href'), story.audio);
  });
});
