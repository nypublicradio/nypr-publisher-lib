import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  whatsOn: service(),
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
