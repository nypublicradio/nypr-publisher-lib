import Ember from 'ember';
import PlayParamMixin from 'nypr-publisher-lib/mixins/play-param';
import { module, test } from 'qunit';

module('Unit | Mixin | play param');

// Replace this with your real tests.
test('it works', function(assert) {
  let PlayParamObject = Ember.Object.extend(PlayParamMixin);
  let subject = PlayParamObject.create();
  assert.ok(subject);
});
