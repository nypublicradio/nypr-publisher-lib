import DS from 'ember-data';
import config from 'ember-get-config';
import AdapterFetch from 'ember-fetch/mixins/adapter-fetch';

export default DS.JSONAPIAdapter.extend(AdapterFetch, {
  host: config.publisherAPI,
  namespace: 'v3',
  pathForType: () => 'link-roll',
  buildURL() {
    let url = this._super(...arguments);
    return url.replace(/([^/])$/, '$1/');
  },
});
