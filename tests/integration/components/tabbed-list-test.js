import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | tabbed list', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('template:components/first-tab', hbs`<div class="first-tab"></div>`);
    this.owner.register('template:components/second-tab', hbs`<div class="second-tab"></div>`);
    this.owner.register('template:components/third-tab', hbs`<div class="third-tab"></div>`);
    this.set('titles', ['First', 'Second', 'Third']);
    this.set('components', ['first-tab', 'second-tab', 'third-tab']);
    this.set('animations', this.owner.lookup('service:liquid-fire-transitions'));
  });

  test('starts with first tab active', async function(assert) {
    await render(hbs`{{tabbed-list tabTitles=titles childComponents=components}}`);
    assert.equal(this.$('.is-active').text().trim(), 'First', 'First tab is active');
    assert.equal(this.$('.first-tab:visible').length, 1, 'First tab is visible');
    assert.equal(this.$('.second-tab:visible').length, 0, 'Second tab is not visible');
  });

  test('can switch to second tab', async function(assert) {
    await render(hbs`{{tabbed-list tabTitles=titles childComponents=components}}`);
    this.$('button:contains(Second)')[0].click();
    return this.get('animations').waitUntilIdle().then(() => {
      assert.equal(this.$('.is-active').text().trim(), 'Second', 'Second tab is active');
      assert.equal(this.$('.first-tab:visible').length, 0, 'First tab is not visible');
      assert.equal(this.$('.second-tab:visible').length, 1, 'Second tab is visible');
    });
  });
});
