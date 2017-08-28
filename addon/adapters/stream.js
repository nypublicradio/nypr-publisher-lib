import config from 'ember-get-config';
import DS from 'ember-data';
import Ember from 'ember';
const { hash } = Ember.RSVP;

export default DS.JSONAPIAdapter.extend({
  host: config.wnycAPI,
  namespace: 'api/v1',
  findAll() {
    let streams, whatsOn;
    let streamUrl = [this.host, this.namespace, 'list/streams'].join('/') + '/';
    let whatsOnUrl = [this.host, this.namespace, 'whats_on'].join('/') + '/';

    let options = this.ajaxOptions(streamUrl, 'GET', {});
    streams = Ember.$.get(options);

    options = this.ajaxOptions(whatsOnUrl, 'GET', {});
    whatsOn = Ember.$.get(options);
    return hash({streams, whatsOn});
  },
  findRecord(store, type, id/*, snapshot*/) {
    let stream, whatsOn;
    let streamUrl = [this.host, this.namespace, 'list/streams', id].join('/') + '/';
    let whatsOnUrl = [this.host, this.namespace, 'whats_on', id].join('/') + '/';

    let options = this.ajaxOptions(streamUrl, 'GET', {});
    stream = Ember.$.get(options);

    options = this.ajaxOptions(whatsOnUrl, 'GET', {});
    whatsOn = Ember.$.get(options);
    return hash({stream, whatsOn});
  }
});
