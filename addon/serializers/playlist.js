import JSONAPISerializer from 'ember-data/serializers/json-api';
import { camelize } from '@ember/string';

export default JSONAPISerializer.extend({
  normalizeFindRecordResponse(store, primaryModelClass, payload, id) {
    return {
      data: {
        type: 'playlist',
        id,
        attributes: {
          items: payload.results.map((result) => {
            let data = {};
            Object.keys(result).forEach(function(key) {
              data[camelize(key)] = result[key];
            });
            return data;
          })
        }
      }
    };
  }
});
