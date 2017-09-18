import ENV from 'ember-get-config';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: ENV.wnycAPI,
  namespace: 'v1',
  pathForType: () => 'stream_playlist',
  buildURL() {
    return this._super(...arguments) + '/';
  }
});
