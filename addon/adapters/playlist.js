import ENV from 'ember-get-config';
import DS from 'ember-data';
import Ember from 'ember';

export default DS.JSONAPIAdapter.extend({
  host: ENV.wnycAPI,
  namespace: 'api/v1',
  findRecord(store, type, id) {
    let playlistUrl = [this.host, this.namespace, 'stream_playlist', id].join('/') + '/';
    let playlist = Ember.$.get(playlistUrl);
    return playlist;
  }
});
