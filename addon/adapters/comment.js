import config from 'ember-get-config';
import DS from 'ember-data';
// TODO: auth headers for native fetch
import fetch from 'fetch';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  host: config.publisherAPI,
  namespace: 'v1/list/comments',
  authorize(xhr) {
    let headers = this.get('session').authorize({});
    for (var h in headers) {
      xhr.setRequestHeader(h, headers[h]);
    }
  },
  query(store, type, query) {
    let url = [this.host, this.namespace, query.itemTypeId, query.itemId, ''].join('/');
    return fetch(url, {
      mode: 'cors',
      credentials: 'include'
    }).then(r => r.json())
  }
});
