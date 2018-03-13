import Route from '@ember/routing/route';

export default Route.extend({
  // BEGIN-SNIPPET stream-playlist-route
  model() {
    return this.store.findRecord('stream', 'jonathan-channel');
  }
  // END-SNIPPET
});
