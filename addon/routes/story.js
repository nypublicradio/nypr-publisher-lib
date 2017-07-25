import Ember from 'ember';
import service from 'ember-service/inject';
import { beforeTeardown } from 'nypr-publisher-lib/lib/compat-hooks';
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
    return `${tokens[0]} - WNYC`;
  },
  model({ slug }) {
    return this.store.findRecord('django-page', `story/${slug}`.replace(/\/*$/, '/')).then(page => {
      let story = page.get('wnycContent');
      let comments = this.store.query('comment', { itemTypeId: story.get('itemTypeId'), itemId: story.get('id') });
      let relatedStories = this.store.query('story', { itemId: story.get('id'), limit: 5});
      return waitFor({
        page,
        story,
        getComments: () => comments,
        getRelatedStories: () => relatedStories,
        adminURL: `${config.wnycAdminRoot}/admin`
      });
    });
  },
  afterModel(model, transition) {
    // get(this, 'googleAds').doTargeting(get(model, 'story').forDfp());

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
    willTransition() {
      this._super(...arguments);
      beforeTeardown();
      return true;
    }
  }
});
