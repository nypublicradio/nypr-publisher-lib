import DS from 'ember-data';
import config from 'ember-get-config';

export default DS.JSONAPIAdapter.extend({
  host: config.publisherAPI,
  namespace: 'v3',
  buildURL() {
    let url = this._super(...arguments);
    return url + '/';
  }
});
