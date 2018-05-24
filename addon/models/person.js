import DS from 'ember-data';
import attr from 'ember-data/attr';
import { get, computed } from '@ember/object';
import toSocialLinks from 'nypr-publisher-lib/utils/to-social-links'

export default DS.Model.extend({
  // BEGIN-SNIPPET person-fields
  slug: attr('string'),
  name: attr('string'),
  jobTitle: attr('string'),
  bio: attr('string'),
  lede: attr('string'),
  url: attr('string'),
  image: attr(),
  social: attr(),
  socialLinks: computed('social', function() {
    let social = get(this, 'social') || [];
    return toSocialLinks(social);
  }),
  // END-SNIPPET
});
