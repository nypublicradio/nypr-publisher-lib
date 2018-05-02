import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';

module('Unit | Model | channel', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('channel'));
    // let store = this.store();
    assert.ok(!!model);
  });

  test('canonicalHost returns correct values for urls', function(assert) {
    assert.expect(6);
    const done = assert.async();
    const channel = run(() => this.owner.lookup('service:store').createRecord('channel'));
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
});
