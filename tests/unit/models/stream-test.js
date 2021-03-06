import EmberObject from '@ember/object';
import { Promise as EmberPromise } from 'rsvp';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';
import { run } from '@ember/runloop';

module('Unit | Model | stream', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('stream'));
    // let store = this.store();
    assert.ok(!!model);
  });

  test('it has the required information for sending a listen action', function(assert) {
    assert.expect(2);
    let model = run(() => this.owner.lookup('service:store').createRecord('stream', {}));

    let storyPromise = EmberPromise.resolve(EmberObject.create({
      id: 5,
      cmsPK: 5,
      itemType: 'episode'
    }));

    let getWrap = sinon.stub(model, 'get')
    getWrap.withArgs('currentStory').returns(storyPromise)
    getWrap.withArgs('cmsPK').returns(123);

    assert.ok(model.forListenAction, "should have forListenAction method");

    // Ember.run(() => {
      model.forListenAction({
        custom: 5
      }).then(d => {
        assert.deepEqual(d, {
          custom: 5,
          current_audio_position: 0,
          audio_type: 'livestream',
          cms_id: 5,
          item_type: 'episode',
          stream_id: 123
        });
      });
    // })
  });

  test('it uses the source_tags attribute to determine site specificty', function(assert) {
    let stream = run(() => this.owner.lookup('service:store').createRecord('stream'));
    assert.notOk(stream.get('isWQXR'), 'no sourceTags should be ok');

    run(() => {
      stream.set('sourceTags', 'wqxr_site, wnyc_site');
      assert.ok(stream.get('isWQXR'), 'should be wqxr');
    });

    run(() => {
      stream.set('sourceTags', 'wnyc_site, wnyc_app');
      assert.ok(stream.get('isWNYC'), 'should be wnyc');
    });
  });
});
