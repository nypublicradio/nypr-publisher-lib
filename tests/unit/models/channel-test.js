import { moduleForModel, test } from 'ember-qunit';
import { run } from '@ember/runloop';

moduleForModel('channel', 'Unit | Model | channel', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('canonicalHost returns correct values for urls', function(assert) {
  assert.expect(6);
  const done = assert.async();
  const channel = this.subject();
  run(() => {
    assert.strictEqual(channel.get('canonicalHost'), undefined, 'it should return undefined when url is not set');

    channel.set('url', 'http://example.org/');
    assert.equal(channel.get('canonicalHost'), 'example.org');

    channel.set('url', 'http://example.org//weird/url//toomanyslashes?');
    assert.equal(channel.get('canonicalHost'), 'example.org');

    channel.set('url', 'example.org');
    assert.strictEqual(channel.get('canonicalHost'), undefined);

    channel.set('url', '');
    assert.strictEqual(channel.get('canonicalHost'), undefined);

    channel.set('url', 'not-even-a-url');
    assert.strictEqual(channel.get('canonicalHost'), undefined);

    done();
  });
});
