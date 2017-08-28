import DS from 'ember-data';
import config from 'ember-get-config';

export default DS.JSONAPIAdapter.extend({
  host: config.wnycAPI,
  namespace: 'api/v3',
  pathForType() { return 'channel'; },
  buildURL() {
    let url = this._super(...arguments);
    return decodeURIComponent(url);
  }
});
