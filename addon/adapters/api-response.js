import DS from 'ember-data';
import config from 'ember-get-config';
import AdapterFetch from 'ember-fetch/mixins/adapter-fetch';

export default DS.JSONAPIAdapter.extend(AdapterFetch, {
  host: config.publisherAPI,
  namespace: 'v3',
  pathForType: () => 'channel',
  buildURL() {
    let url = this._super(...arguments);
    return decodeURIComponent(url);
  },
  urlForFindRecord(id, modelName, snapshot) {
    let baseUrl = this.buildURL(modelName, id, snapshot);
    if (snapshot.adapterOptions) {
      let limit = (snapshot.adapterOptions.limit);
      if (limit) {
        baseUrl += `?limit=${limit}`;
      }
    }
    return baseUrl;
  },
  // ember 2.0 deprecation
  shouldBackgroundReloadRecord: () => false
});
