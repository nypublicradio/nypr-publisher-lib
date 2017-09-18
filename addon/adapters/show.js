import DS from 'ember-data';
import ENV from 'ember-get-config';

export default DS.JSONAPIAdapter.extend({
  host: ENV.wnycAPI,
  namespace: 'v3',
  buildURL() {
    let url = this._super(...arguments);
    return url.replace(/([^/])$/, '$1/');
  }
});
