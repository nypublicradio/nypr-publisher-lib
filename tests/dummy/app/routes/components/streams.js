import Ember from 'ember';

export default Ember.Route.extend({
  // BEGIN-SNIPPET stream-list-route
  model() {
    return this.store.findAll('stream');
  }
  // END-SNIPPET
});
