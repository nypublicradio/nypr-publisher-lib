import Ember from 'ember';
import service from 'ember-service/inject';
import config from 'ember-get-config';
const { get } = Ember;
const { hash: waitFor } = Ember.RSVP;

export default Ember.Route.extend({
  session:      service(),
  currentUser:  service(),

  titleToken(model) {
    return `${get(model, 'story.title')} - ${get(model, 'story.headers.brand.title')}`;
  },
  title(tokens) {
    return `${tokens[0]} - WQXR`;
  },
  model({ slug }, { queryParams }) {
    return this.store.findRecord('story', slug, {adapterOptions: {queryParams}}).then(story => {
      let comments = this.store.query('comment', { itemTypeId: story.get('itemTypeId'), itemId: story.get('cmsPK') });
      let relatedStories = this.store.query('story', {related: { itemId: story.get('cmsPK'), limit: 5 }});
      return waitFor({
        story,
        getComments: () => comments,
        getRelatedStories: () => relatedStories,
        adminURL: `${config.wnycAdminRoot}/admin`
      });
    });
  },
  afterModel(model, transition) {

    if (get(model, 'story.headerDonateChunk')) {
      transition.send('updateDonateChunk', get(model, 'story.headerDonateChunk'));
    }
  },

  setupController(controller) {
    controller.set('isMobile', window.Modernizr.touchevents);
    controller.set('session', get(this, 'session'));
    controller.set('user', get(this, 'currentUser.user'));
    return this._super(...arguments);
  },

  actions: {

  }
});
