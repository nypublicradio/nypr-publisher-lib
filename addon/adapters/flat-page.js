import DS from 'ember-data';
import config from 'ember-get-config';
import AdapterFetch from 'ember-fetch/mixins/adapter-fetch';

export default DS.JSONAPIAdapter.extend(AdapterFetch, {
  host: config.publisherAPI,
  namespace: 'v3',
  pathForType: () => 'flatpages',
  urlForQuery(query) {
    if (query) {
      if (!query.filter) {
        query.filter = {};
      }
      if (query.filter.url && query.filter.url.substr(-1) !== '/') {
        query.filter.url += '/';
      }
      query.filter.site = config.siteId;
    }
    return this._super(...arguments);
  },
  buildURL() {
    let url = this._super(...arguments);
    return url.replace(/([^/])$/, '$1/');
  },
});
