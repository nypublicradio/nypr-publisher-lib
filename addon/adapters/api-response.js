import DS from 'ember-data';
import ENV from 'ember-get-config';

export default DS.JSONAPIAdapter.extend({
  host: ENV.wnycAPI,
  namespace: 'api/v3',
  pathForType() { return 'channel'; },
  buildURL() {
    let url = this._super(...arguments);
    return decodeURIComponent(url);
  },
  // ember 2.0 deprecation
  shouldBackgroundReloadRecord() {
    return false;
  }
});
