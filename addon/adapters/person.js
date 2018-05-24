import DS from 'ember-data';
import config from 'ember-get-config';
import AdapterFetch from 'ember-fetch/mixins/adapter-fetch';

export default DS.JSONAPIAdapter.extend(AdapterFetch, {
  host: config.publisherAPI,
  namespace: 'v3',
  buildURL() {
    let url = this._super(...arguments);
    return url.replace(/([^/])$/, '$1/');
  },
  pathForType: (type) => type /* don't pluralize */
});
