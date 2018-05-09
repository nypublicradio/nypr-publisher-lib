import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';
import { get } from '@ember/object';

module('Unit | Model | tout', function(hooks) {
  setupTest(hooks);

  let storyParams = {
    title: 'Story 123',
    newsdate: 'April 2018',
    id: 123,
  }

  let toutParams = {
    title: 'Tout 123',
    targetType: 'story',
    targetId: 123,
  }

  test('it proxies a story', function(assert) {
    run(() => this.owner.lookup('service:store').createRecord('story', storyParams));
    let tout = run(() => this.owner.lookup('service:store').createRecord('tout', toutParams));

    assert.equal(get(tout, 'title'), 'Tout 123');
    assert.equal(get(tout, 'newsdate'), 'April 2018');
  });
});
