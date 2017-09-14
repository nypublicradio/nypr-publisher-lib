import ENV from 'ember-get-config';
import DS from 'ember-data';
import wrapAjax from 'nypr-publisher-lib/utils/wrap-ajax';

export default DS.JSONAPIAdapter.extend({
  host: ENV.wnycAPI,
  namespace: 'api/v1',
  findRecord(store, type, id) {
    let playlistUrl = [this.host, this.namespace, 'stream_playlist', id].join('/') + '/';
    let options = this.ajaxOptions(playlistUrl, 'GET', {});
    return wrapAjax(options);
  }
});
