import config from 'ember-get-config';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { canonicalize } from 'nypr-django-for-ember/services/script-loader';
let { webRoot } = config;
webRoot = canonicalize(webRoot);

module('Integration | Component | nav links', function(hooks) {
  setupRenderingTest(hooks);

  test('it properly sets the activeTab if defaultTab is undefined', async function(assert) {
    this.set('defaultTab', undefined);
    this.set('links', [
      {href: null, 'nav-slug': 'foo', title: 'Foo'},
      {href: 'http://example.com', title: 'Example'}
    ]);
    this.set('navRoot', 'baz/bar');
    await render(hbs`{{nav-links defaultSlug=defaultSlug navRoot=navRoot links=links}}`);

    assert.equal(this.$('.is-active').text().trim(), 'Foo', 'first link should be active');
  });

  test('it properly parses incoming linkroll links', async function(assert) {

    this.set('links', [
      {href: `${webRoot}foo/bar/`, title: 'Example'}
    ]);
    await render(hbs`{{nav-links links=links}}`);
    assert.equal(this.$('.is-active a').attr('href'), '/foo/bar/', 'links with matching origins have a leading slash');
  });
});
