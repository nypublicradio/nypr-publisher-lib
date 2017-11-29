import { moduleForModel, test } from 'ember-qunit';

moduleForModel('api-response', 'Unit | Serializer | api response', {
  // Specify the other units that are required for this test.
  needs: ['serializer:api-response', 'model:api-response']
});

test('it loads',  function(assert) {
  let record = this.subject();
  assert.ok(record);
});
