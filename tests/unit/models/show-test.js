import { moduleForModel, test } from 'ember-qunit';

moduleForModel('show', 'Unit | Model | show', {
  // Specify the other units that are required for this test.
  needs: ['model:api-response', 'model:image', 'model:producing-organization']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
