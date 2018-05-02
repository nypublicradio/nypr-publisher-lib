import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | episode list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    await render(hbs`{{episode-list}}`);

    assert.equal(this.$().text().trim(), '');
  });

  test('it shows episode teases', async function(assert) {
    let model = {
      teaseList: [
        {
          title: "abc",
          slug: "abc",
          tease: "hello world",
          newsdate: "2017-05-19T00:00:00-04:00"
        },
        {
          title: "def",
          slug: "def",
          tease: "testing 123",
          newsdate: "2017-05-19T00:00:00-04:00"
        }
      ]
    };
    this.set('model', model)

    await render(hbs`{{episode-list model=model}}`);

    assert.equal(this.$('.episode-list__list-item').length, 2, 'it should show two episodes');
  });
});
