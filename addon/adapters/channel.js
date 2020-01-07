import { assign } from '@ember/polyfills';
import DS from 'ember-data';
import config from 'ember-get-config';

export default DS.JSONAPIAdapter.extend({
  host: config.publisherAPI,
  namespace: 'v3',
  pathForType: () => 'channel',
  ajaxOptions(urlToDecode, type, options = {}) {
    options = this._super(...arguments);
    const url = decodeURIComponent(urlToDecode);

    return assign(options, {
      url: url.slice(-1) === '/' ? `${url}/` : url,
    });
  },
  urlForFindRecord(id, modelName, snapshot) {
    let baseUrl = this.buildURL(modelName, id, snapshot);
    if (snapshot.adapterOptions) {
      let limit = (snapshot.adapterOptions.limit);
      if (limit) {
        baseUrl += `?limit=${limit}`;
      }
    }
    return baseUrl;
  },
});
