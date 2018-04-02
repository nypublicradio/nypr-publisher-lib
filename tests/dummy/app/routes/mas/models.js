import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {fields: [
      'api-response',
      'bucket',
      'channel',
      'chunk',
      'comment',
      'flat-page',
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
