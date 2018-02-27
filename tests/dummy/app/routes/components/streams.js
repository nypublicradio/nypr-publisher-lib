import Route from '@ember/routing/route';

export default Route.extend({
  // BEGIN-SNIPPET stream-list-route
  model() {
    return this.store.findAll('stream');
  }
  // END-SNIPPET
});
