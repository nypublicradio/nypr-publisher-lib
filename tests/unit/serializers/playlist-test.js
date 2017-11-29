import { moduleForModel, test } from 'ember-qunit';

moduleForModel('playlist', 'Unit | Serializer | playlist', {
  // Specify the other units that are required for this test.
  needs: ['serializer:playlist']
});

test('it loads',  function(assert) {
  let record = this.subject();
  assert.ok(record);
});
