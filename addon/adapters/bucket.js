import DS from 'ember-data';
import ENV from 'ember-get-config';

export default DS.JSONAPIAdapter.extend({
  host: ENV.wnycAPI,
  namespace: 'v3',
  buildURL(modelName, id, snapshot, requestType, query) {
    let url = this._super(...arguments);
    if (requestType !== 'findRecord') {
      return url;
    }

    url += `/?site=${ENV.siteSlug}`;
    if (query && Object.keys(query).length) {
      let qp = Object.keys(query).map(k => `${k}=${query[k]}`);
      url += qp.join('&');
    }
    return url;
  }
});
