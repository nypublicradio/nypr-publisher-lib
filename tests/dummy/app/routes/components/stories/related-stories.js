import Ember from 'ember';

// BEGIN-SNIPPET related-to
const RELATED_TO_ID = 371424
// END-SNIPPET
export default Ember.Route.extend({
  model() {
    return {
      // BEGIN-SNIPPET get-related-stories
      getRelatedStories: () => this.store.query('story', {related: {itemId: RELATED_TO_ID, limit: 5}})
      // END-SNIPPET
    };
  }
});
