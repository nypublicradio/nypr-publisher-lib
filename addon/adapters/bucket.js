import DS from 'ember-data';
import config from 'ember-get-config';
import AdapterFetch from 'ember-fetch/mixins/adapter-fetch';

export default DS.JSONAPIAdapter.extend(AdapterFetch, {
  host: config.publisherAPI,
  namespace: 'v3',
  buildURL(modelName, id, snapshot, requestType, query) {
    let url = this._super(...arguments);
    if (requestType !== 'findRecord') {
      return url;
    }

    url += `/?site=${config.siteSlug}`;
    if (query && Object.keys(query).length) {
      let qp = Object.keys(query).map(k => `${k}=${query[k]}`);
      url += qp.join('&');
    }
    return url;
  }
});
