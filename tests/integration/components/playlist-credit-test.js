import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { faker } from 'ember-cli-mirage';

module('Integration | Component | playlist credit', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{playlist-credit}}`);

    assert.equal(this.$('span').length, 1);
  });

  test('it renders a song title', async function(assert) {
    let title = faker.company.catchPhrase();
    let musicEntry = {
      title
    };

    this.set('musicEntry', musicEntry)
    await render(hbs`{{playlist-credit musicEntry=musicEntry}}`);

    assert.equal(this.$().text().trim(), `"${title}"`);
  });

  test('it renders a song title and artist', async function(assert) {
    let title = faker.company.catchPhrase();
    let artists = faker.name.findName();
    let musicEntry = {
      title,
      artists
    };

    this.set('musicEntry', musicEntry)
    await render(hbs`{{playlist-credit musicEntry=musicEntry}}`);

    assert.equal(this.$().text().trim().replace(/\s+/gm,' '), `"${title}" by ${artists}`);
  });

  test('it renders a song title and label', async function(assert) {
    let title = faker.company.catchPhrase();
    let label = faker.company.companyName();
    let musicEntry = {
      title,
      label
    };

    this.set('musicEntry', musicEntry)
    await render(hbs`{{playlist-credit musicEntry=musicEntry}}`);

    assert.equal(this.$().text().trim().replace(/\s+/gm,' '), `"${title}" from ${label}`);
  });

  test('it renders a song title and artist and label', async function(assert) {
    let title = faker.company.catchPhrase();
    let artists = faker.name.findName();
    let label = faker.company.companyName();
    let musicEntry = {
      title,
      artists,
      label
    };

    this.set('musicEntry', musicEntry)
    await render(hbs`{{playlist-credit musicEntry=musicEntry}}`);

    assert.equal(this.$().text().trim().replace(/\s+/gm,' '), `"${title}" by ${artists} from ${label}`);
  });
});
