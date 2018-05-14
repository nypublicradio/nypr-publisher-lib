import { moduleForModel, test } from 'ember-qunit';

moduleForModel('api-response', 'Unit | Model | api response', {
  // Specify the other units that are required for this test.
  needs: ['model:story', 'model:appearance', 'model:about-page', 'model:bucket-item'],
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
