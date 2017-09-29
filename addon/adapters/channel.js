import DS from 'ember-data';
import Ember from 'ember';
import config from 'ember-get-config';

export default DS.JSONAPIAdapter.extend({
  host: config.publisherAPI,
  namespace: 'v3',
  pathForType: () => 'channel',
  ajaxOptions(urlToDecode, type, options = {}) {
    options = this._super(...arguments);
    const url = decodeURIComponent(urlToDecode);

    return Ember.assign(options, {
      url: url.slice(-1) === '/' ? `${url}/` : url,
    });
  }
});
