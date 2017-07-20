import Ember from 'ember';
import ListingRouteMixin from 'nypr-publisher-lib/mixins/listing-route';
import { module, test } from 'qunit';

module('Unit | Mixin | listing route');

// Replace this with your real tests.
test('it works', function(assert) {
  let ListingRouteObject = Ember.Object.extend(ListingRouteMixin);
  let subject = ListingRouteObject.create();
  assert.ok(subject);
});
