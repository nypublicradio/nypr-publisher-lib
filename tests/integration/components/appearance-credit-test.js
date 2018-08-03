import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { faker } from 'ember-cli-mirage';

module('Integration | Component | appearance credit', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders nothing for zero names', async function(assert) {
    let appearances = [];
    this.set('appearances', appearances);
    await render(hbs`{{appearance-credit 'Thanks' appearances}}`);

    assert.equal(this.$('.appearance-credit').length, 0);
  });


  test('it renders one name', async function(assert) {
    let name1 = faker.name.findName();
    let appearances = [{name: name1}];
    this.set('appearances', appearances);
    await render(hbs`{{appearance-credit 'Thanks' appearances}}`);

    assert.equal(this.$('.appearance-credit').text().trim(), `Thanks ${name1}`);
  });

  test('it renders two names', async function(assert) {
    let name1 = faker.name.findName();
    let name2 = faker.name.findName();
    let appearances = [{name: name1}, {name: name2}];
    this.set('appearances', appearances);
    await render(hbs`{{appearance-credit 'Thanks' appearances}}`);

    assert.equal(this.$('.appearance-credit').text().trim(), `Thanks ${name1} and ${name2}`);
  });

  test('it renders three names', async function(assert) {
    let name1 = faker.name.findName();
    let name2 = faker.name.findName();
    let name3 = faker.name.findName();
    let appearances = [{name: name1}, {name: name2}, {name: name3}];
    this.set('appearances', appearances);
    await render(hbs`{{appearance-credit 'Thanks' appearances}}`);

    assert.equal(this.$('.appearance-credit').text().trim(), `Thanks ${name1}, ${name2} and ${name3}`);
  });
});
