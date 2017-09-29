import Ember from 'ember';
import config from 'dummy/config/environment';

export default Ember.Route.extend({
  model() {
    return {
      channel: this.store.findRecord('channel', 'shows/bl/'),
      // BEGIN-SNIPPET listen-live
      listenLive: this.store.createRecord('django-page', {
        text: "<span data-ember-component=\"listen-button.embedded\" data-ember-args='{\"itemPK\": \"wnyc-fm939\", \"type\": \"blue-minion\", \"itemTitle\": \"Listen to WNYC FM\"}'>Listen Live</span>"
      })
      // END-SNIPPET
    };
  },
  setupController(controller) {
    this._super(...arguments);
    controller.set('adminURL', `${config.adminRoot}/admin`);
  }
});
