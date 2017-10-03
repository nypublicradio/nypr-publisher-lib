import Ember from 'ember';

export default Ember.Route.extend({
  // BEGIN-SNIPPET stream-playlist-route
  model() {
    return this.store.findRecord('stream', 'jonathan-channel');
  }
  // END-SNIPPET
});
