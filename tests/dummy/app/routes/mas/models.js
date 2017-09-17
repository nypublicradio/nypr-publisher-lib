import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {fields: [
      'api-response',
      'bucket',
      'channel',
      'chunk',
      'comment',
      'playlist',
      'show',
      'story',
      'stream',
      'about-page',
      'image',
      'producing-organization',
    ].sort()};
  }
});
