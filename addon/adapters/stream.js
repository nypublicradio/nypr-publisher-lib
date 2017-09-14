import ENV from 'ember-get-config';
import DS from 'ember-data';
import rsvp from 'rsvp';
import wrapAjax from 'nypr-publisher-lib/utils/wrap-ajax';

export default DS.JSONAPIAdapter.extend({
  host: ENV.wnycAPI,
  namespace: 'api/v1',
  findAll() {
    let streams, whatsOn;
    let streamUrl = [this.host, this.namespace, 'list/streams'].join('/') + '/';
    let whatsOnUrl = [this.host, this.namespace, 'whats_on'].join('/') + '/';

    let options = this.ajaxOptions(streamUrl, 'GET', {});
    streams = wrapAjax(options);

    options = this.ajaxOptions(whatsOnUrl, 'GET', {});
    whatsOn = wrapAjax(options);
    return rsvp.hash({streams, whatsOn});
  },
  findRecord(store, type, id/*, snapshot*/) {
    let stream, whatsOn;
    let streamUrl = [this.host, this.namespace, 'list/streams', id].join('/') + '/';
    let whatsOnUrl = [this.host, this.namespace, 'whats_on', id].join('/') + '/';

    let options = this.ajaxOptions(streamUrl, 'GET', {});
    stream = wrapAjax(options);

    options = this.ajaxOptions(whatsOnUrl, 'GET', {});
    whatsOn = wrapAjax(options);
    return rsvp.hash({stream, whatsOn});
  }
});
