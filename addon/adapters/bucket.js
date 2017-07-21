import config from 'ember-get-config';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  buildURL(modelName, id, snapshot, requestType, query) {
    if (requestType !== 'findRecord') {
      return this._super(...arguments);
    }
    let url = `${this.host}/${this.namespace}/${modelName}/${id}/?site=${config.siteSlug}`;
    if (query && Object.keys(query).length) {
      let qp = Object.keys(query).map(k => `${k}=${query[k]}`);
      url += qp.join('&');
    }
    return url;
  }
});
