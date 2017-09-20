import config from 'ember-get-config';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: config.publisherAPI,
  namespace: 'v1',
  pathForType: () => 'stream_playlist',
  buildURL() {
    return this._super(...arguments) + '/';
  }
});
