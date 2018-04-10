import DS from 'ember-data';
import { serializeApiResponseRelationships } from 'nypr-publisher-lib/serializers/api-response';

export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, typeClass, {included = [], data}, id, requestType) {
    let featuredStory = data.attributes.featured;
    delete data.attributes.featured;

    included.push({
      type: 'api-response',
      id: `${id}/about/1`,
      relationships: {
        'about-page': {
          data: {
            type: 'about-page', id: `${id}/about`
          }
        }
      }
    },
    {
      type: 'about-page',
      id: `${id}/about`,
      attributes: data.attributes.about
    });

    included = included.map(r => {
      if (r.type === 'api-response') {
        r.relationships = serializeApiResponseRelationships(r.relationships, included);
        return r;
      }
      return r;
    });

    if (featuredStory) {
      let story = {
        type: 'story',
        id: featuredStory.slug,
        attributes: featuredStory
      };

      included.push(story);

      data.relationships = {
        featured: {
          data: {
            type: 'story',
            id: featuredStory.slug
          }
        }
      };
    }
    return this._super(store, typeClass, {data, included}, id, requestType);
  }
});
