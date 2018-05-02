import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

import { run } from '@ember/runloop';

module('Unit | Serializer | playlist', function(hooks) {
  setupTest(hooks);

  test('it loads',  function(assert) {
    let record = run(() => this.owner.lookup('service:store').createRecord('playlist'));
    assert.ok(record);
  });
});
