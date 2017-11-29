import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('episode-list', 'Integration | Component | episode list', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{episode-list}}`);

  assert.equal(this.$().text().trim(), '');
});

test('it shows episode teases', function(assert) {
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

  this.render(hbs`{{episode-list model=model}}`);

  assert.equal(this.$('.episode-list__list-item').length, 2, 'it should show two episodes');
});
