import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { run } from '@ember/runloop';

module('Unit | Model | story', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('story'));
    // let store = this.store();
    assert.ok(!!model);
  });

  test('segment management', function(assert) {
    let model = run(() => this.owner.lookup('service:store').createRecord('story', { audio: 'foo.mp3' }));
    assert.equal(model.getNextSegment(), null, 'getNextSegment returns null if there are no segments');
    assert.equal(model.getCurrentSegment(), model.get('audio'), 'getCurrentSegment returns the audio field if there are no segments');

    run(() => {
      model.set('audio', ['foo', 'bar']);
    });

    assert.equal(model.hasNextSegment(), true, 'if we are not on the last segment, report false');
    assert.equal(model.getCurrentSegment(), 'foo', 'currentSegment should be foo');

    assert.equal(model.getNextSegment(), 'bar', 'nextSegment should be bar');
    assert.equal(model.getCurrentSegment(), 'bar', 'calling getCurrentSegment after getNextSegment should return the incremented value');
    assert.equal(model.hasNextSegment(), false, 'if we are on the last segment, report false');

    assert.equal(model.getNextSegment(), 'foo', 'calling getNextSegment at the end of the list should wrap around');
    model.getNextSegment();
    model.resetSegments();
    assert.equal(model.getCurrentSegment(), 'foo', 'currentSegment should be foo');
  });

  test('forDfp returns properties for targeting', function(assert) {
    let forDfp = {tags: ['foo', 'bar'], show: 'foo show', channel: 'foo channel', series: 'foo series'};
    let model = run(() => this.owner.lookup('service:store').createRecord('story', forDfp));

    assert.deepEqual(model.forDfp(), forDfp);
  });

  test('it has the required information for sending a listen action', function(assert) {
    assert.expect(2);
    let model = run(
      () => this.owner.lookup('service:store').createRecord('story', { audio: 'foo.mp3', itemType: 'episode', cmsPK: 123 })
    );
    assert.ok(model.forListenAction, "should have forListenAction method");
    model.forListenAction({custom: 5}).then(d => {
      assert.deepEqual(d, {
        custom: 5,
        audio_type: 'on_demand',
        cms_id: model.get('cmsPK'),
        item_type: 'episode', // episode, article, segment
      });
    });
  });
});
