import JSONAPISerializer from 'ember-data/serializers/json-api';
import { camelize } from 'ember-string';

export default JSONAPISerializer.extend({
  extractId: (modelClass, {attributes}) => attributes.slug || "none",
  // BEGIN-SNIPPET bucket-serializer
  normalizeResponse(store, klass, payload/*, id, requestType*/) {
    // these are not actual ember models; need to camelize for consumption by components
    if (payload.data.attributes['bucket-items']) {
      payload.data.attributes['bucket-items'].forEach(item => {
        let { attributes } = item;
        item.attributes = {};

        Object.keys(attributes)
          .forEach(k => item.attributes[camelize(k)] = attributes[k]);
      });
    }
    return this._super(...arguments);
  }
  // END-SNIPPET
});
