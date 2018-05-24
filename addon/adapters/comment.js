import config from 'ember-get-config';
import DS from 'ember-data';
import wrapAjax from 'nypr-django-for-ember/utils/wrap-ajax'
// TODO: auth headers for native fetch
// import fetch from 'fetch';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import AdapterFetch from 'ember-fetch/mixins/adapter-fetch';

export default DS.JSONAPIAdapter.extend(AdapterFetch, DataAdapterMixin, {
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
    let options = this.ajaxOptions(url, 'GET', {});
    return wrapAjax(options);
  }
});
