import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { run } from '@ember/runloop';

module('Unit | Serializer | story', function(hooks) {
  setupTest(hooks);

  test('it loads',  function(assert) {
    let record = run(() => this.owner.lookup('service:store').createRecord('story'));
    assert.ok(record);
  });
});
