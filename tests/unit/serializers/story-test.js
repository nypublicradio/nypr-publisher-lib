import { moduleForModel, test } from 'ember-qunit';

moduleForModel('story', 'Unit | Serializer | story', {
  // Specify the other units that are required for this test.
  needs: ['serializer:story']
});

test('it loads',  function(assert) {
  let record = this.subject();
  assert.ok(record);
});
