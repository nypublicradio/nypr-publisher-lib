import config from 'ember-get-config';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { canonicalize  } from 'nypr-django-for-ember/services/script-loader';
let { webRoot } = config;
webRoot = canonicalize(webRoot);

moduleForComponent('nav-links', 'Integration | Component | nav links', {
  integration: true
});

test('it properly sets the activeTab if defaultTab is undefined', function(assert) {
  this.set('defaultTab', undefined);
  this.set('links', [
    {href: null, 'nav-slug': 'foo', title: 'Foo'},
    {href: 'http://example.com', title: 'Example'}
  ]);
  this.set('navRoot', 'baz/bar');
  this.render(hbs`{{nav-links defaultSlug=defaultSlug navRoot=navRoot links=links}}`);

  assert.equal(this.$('.is-active').text().trim(), 'Foo', 'first link should be active');
});

test('it properly parses incoming linkroll links', function(assert) {

  this.set('links', [
    {href: `${webRoot}foo/bar/`, title: 'Example'}
  ]);
  this.render(hbs`{{nav-links links=links}}`);
  assert.equal(this.$('.is-active a').attr('href'), '/foo/bar/', 'links with matching origins have a leading slash');
});
