import Route from 'ember-route';
import get from 'ember-metal/get';

export default Route.extend({
  titleToken(model) {
    return `Playlist for ${get(model, 'name')}`;
  },
  model({ slug }) {
    return this.store.findRecord('stream', slug);
  }
});
