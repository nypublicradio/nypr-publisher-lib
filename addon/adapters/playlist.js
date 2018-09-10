import config from 'ember-get-config';
import DS from 'ember-data';
import AdapterFetch from 'ember-fetch/mixins/adapter-fetch';

export default DS.JSONAPIAdapter.extend(AdapterFetch, {
  host: config.publisherAPI,
  namespace: 'v1',
  pathForType: () => 'stream_playlist',
  buildURL() {
    return this._super(...arguments) + '/';
  }
});
