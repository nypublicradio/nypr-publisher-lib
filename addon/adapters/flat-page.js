import DS from 'ember-data';
import config from 'ember-get-config';

export default DS.JSONAPIAdapter.extend({
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
  }
});
