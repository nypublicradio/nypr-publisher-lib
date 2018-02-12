import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { faker } from 'ember-cli-mirage';

moduleForComponent('playlist-credit', 'Integration | Component | playlist credit', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{playlist-credit}}`);

  assert.equal(this.$('span').length, 1);
});

test('it renders a song title', function(assert) {
  let title = faker.company.catchPhrase();
  let musicEntry = {
    title
  };

  this.set('musicEntry', musicEntry)
  this.render(hbs`{{playlist-credit musicEntry=musicEntry}}`);

  assert.equal(this.$().text().trim(), `"${title}"`);
});

test('it renders a song title and artist', function(assert) {
  let title = faker.company.catchPhrase();
  let artists = faker.name.findName();
  let musicEntry = {
    title,
    artists
  };

  this.set('musicEntry', musicEntry)
  this.render(hbs`{{playlist-credit musicEntry=musicEntry}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gm,' '), `"${title}" by ${artists}`);
});

test('it renders a song title and label', function(assert) {
  let title = faker.company.catchPhrase();
  let label = faker.company.companyName();
  let musicEntry = {
    title,
    label
  };

  this.set('musicEntry', musicEntry)
  this.render(hbs`{{playlist-credit musicEntry=musicEntry}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gm,' '), `"${title}" from ${label}`);
});

test('it renders a song title and artist and label', function(assert) {
  let title = faker.company.catchPhrase();
  let artists = faker.name.findName();
  let label = faker.company.companyName();
  let musicEntry = {
    title,
    artists,
    label
  };

  this.set('musicEntry', musicEntry)
  this.render(hbs`{{playlist-credit musicEntry=musicEntry}}`);

  assert.equal(this.$().text().trim().replace(/\s+/gm,' '), `"${title}" by ${artists} from ${label}`);
});
