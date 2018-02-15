import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('download-link', 'Integration | Component | download link', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });
  let story = ({audio: "http://example.com", title:"Story"})
  this.set('story', story)

  this.render(hbs`{{download-link story=story}}`);

  assert.equal(this.$('.download-link').length, 1);
  assert.equal(this.$('.download-link').attr('href'), story.audio);
});
