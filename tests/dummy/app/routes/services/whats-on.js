import Ember from 'ember';

export default Ember.Route.extend({
  whatsOn: Ember.inject.service(),
  setupController(controller) {
    this._super(...arguments);
    // BEGIN-SNIPPET use-whats-on
    this.get('whatsOn').isLive(363)
      .then(([isLive, endtime, stationSlug]) => {
        controller.setProperties({
          isLive,
          endtime,
          stationSlug
        });
      });
    // END-SNIPPET
  }
});
