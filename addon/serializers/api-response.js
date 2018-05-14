import DS from 'ember-data';
import { A } from '@ember/array';
import { get } from '@ember/object';
import { serializeStoryAttributes } from 'nypr-publisher-lib/serializers/story';

export function serializeApiResponseRelationships(relationships = {}, included = []) {
  if (get(relationships, 'tease-list.data.length')) {
    relationships['tease-list'].data.forEach(item => {
      if (item.type === 'story') {
        let { attributes } = A(included).findBy('attributes.cms-pk', Number(item.id));
        item.id = attributes.slug;
        serializeStoryAttributes(attributes);
      }
    });
  }
  if (get(relationships, 'story.data')) {
    let { attributes } = A(included).findBy('attributes.cms-pk', Number(relationships.story.data.id));
    relationships.story.data.id = attributes.slug;
    serializeStoryAttributes(attributes);
  }
  return relationships;
}

export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, typeClass, {included = [], data}, id, requestType) {
    data.relationships = serializeApiResponseRelationships(data.relationships, included);
    return this._super(store, typeClass, {included, data}, id, requestType);
  }
});
