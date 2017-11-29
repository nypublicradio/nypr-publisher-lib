import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('image-caption', 'Integration | Component | image caption', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{image-caption}}`);

  let text = this.$().text().replace(/\s\s+/g, ' ').trim();
  assert.equal(text, '');
});

test('it renders captions', function(assert) {
  let image = {
    caption: "Great Photo"
  };
  this.set('image', image);
  this.render(hbs`{{image-caption image=image}}`);

  let text = this.$().text().replace(/\s\s+/g, ' ').trim();
  assert.equal(text, 'Great Photo');
});

test('it renders credits', function(assert) {
  let image = {
    creditsName:  "Loren Ipsson"
  };
  this.set('image', image);
  this.render(hbs`{{image-caption image=image}}`);

  let text = this.$().text().replace(/\s\s+/g, ' ').trim();
  assert.equal(text, '( Loren Ipsson )');
});

test('it renders credits with sources', function(assert) {
  let image = {
    creditsName:  "Loren Ipsson",
    source: {name: "World Photos"}
  };
  this.set('image', image);
  this.render(hbs`{{image-caption image=image}}`);

  let text = this.$().text().replace(/\s\s+/g, ' ').trim();
  assert.equal(text, '( Loren Ipsson / World Photos )');
});

test('it renders captions and credits with sources', function(assert) {
  let image = {
    caption: "Great Photo",
    creditsName:  "Loren Ipsson",
    source: {name: "World Photos"}
  };
  this.set('image', image);
  this.render(hbs`{{image-caption image=image}}`);

  let text = this.$().text().replace(/\s\s+/g, ' ').trim();
  assert.equal(text, 'Great Photo ( Loren Ipsson / World Photos )');
});
