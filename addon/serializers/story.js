import DS from 'ember-data';
import { camelizeObject } from 'nypr-publisher-lib/helpers/camelize-object';

// BEGIN-SNIPPET story-serializer-fields
//dasherized versions of names in model bc they haven't been processsed yet
const propertiesWithChildren = [
  'appearances',
  'chunks',
  'headers',
  'image-main',
  'playlist',
  'producing-organizations',
  'segments',
  'series',
  'show-producing-orgs',
  'slideshow'
];
// END-SNIPPET

// BEGIN-SNIPPET story-serializer
export function serializeStoryAttributes(attributes) {
  for (var prop of propertiesWithChildren) {
    //if we have the property, process it
    if (attributes && attributes.hasOwnProperty(prop)){
      attributes[prop] = camelizeObject(attributes[prop]);
    }
  }
}
// END-SNIPPET

export default DS.JSONAPISerializer.extend({
  extractId: (modelClass, {attributes}) => attributes.slug,
  payloadKeyFromModelName: () => 'story',

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    serializeStoryAttributes(payload.data.attributes);
    return this._super(store, primaryModelClass, payload, id, requestType);
  },
});
