import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { faker } from 'ember-cli-mirage';

moduleForComponent('appearance-credit', 'Integration | Component | appearance credit', {
  integration: true
});

test('it renders nothing for zero names', function(assert) {
  let appearances = [];
  this.set('appearances', appearances);
  this.render(hbs`{{appearance-credit 'Thanks' appearances}}`);

  assert.equal(this.$('.appearance-credit').length, 0);
});


test('it renders one name', function(assert) {
  let name1 = faker.name.findName();
  let appearances = [{name: name1}];
  this.set('appearances', appearances);
  this.render(hbs`{{appearance-credit 'Thanks' appearances}}`);

  assert.equal(this.$('.appearance-credit').text().trim(), `Thanks ${name1}`);
});

test('it renders two names', function(assert) {
  let name1 = faker.name.findName();
  let name2 = faker.name.findName();
  let appearances = [{name: name1}, {name: name2}];
  this.set('appearances', appearances);
  this.render(hbs`{{appearance-credit 'Thanks' appearances}}`);

  assert.equal(this.$('.appearance-credit').text().trim(), `Thanks ${name1} and ${name2}`);
});

test('it renders three names', function(assert) {
  let name1 = faker.name.findName();
  let name2 = faker.name.findName();
  let name3 = faker.name.findName();
  let appearances = [{name: name1}, {name: name2}, {name: name3}];
  this.set('appearances', appearances);
  this.render(hbs`{{appearance-credit 'Thanks' appearances}}`);

  assert.equal(this.$('.appearance-credit').text().trim(), `Thanks ${name1}, ${name2} and ${name3}`);
});
