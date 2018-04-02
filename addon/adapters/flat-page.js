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
      query.filter.site = config.siteId;
    }
    return this._super(...arguments);
  }
});
