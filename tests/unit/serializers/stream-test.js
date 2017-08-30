import { moduleForModel, test } from 'ember-qunit';

moduleForModel('stream', 'Unit | Serializer | stream', {
  // Specify the other units that are required for this test.
  needs: ['serializer:stream']
});

test('it loads',  function(assert) {
  let record = this.subject();
  assert.ok(record);
});
