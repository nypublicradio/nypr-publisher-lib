import DS from 'ember-data';
import { A } from '@ember/array';
import { serializeStoryAttributes } from 'nypr-publisher-lib/serializers/story';

export function serializeApiResponseRelationships(relationships = {}, included = []) {
  if (relationships['tease-list'] && relationships['tease-list'].data.length) {
    relationships['tease-list'].data.forEach(story => {
      let { attributes } = A(included).findBy('attributes.cms-pk', Number(story.id));
      story.id = attributes.slug;
      serializeStoryAttributes(attributes);
    });
  }
  if (relationships.story && relationships.story.data) {
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
