import DS from 'ember-data';
import attr from 'ember-data/attr';
import { get, computed } from '@ember/object';
import toSocialLinks from 'nypr-publisher-lib/utils/to-social-links'

export default DS.Model.extend({
  // BEGIN-SNIPPET appearance-fields
  appearanceType: attr('string'),
  person: attr(),
  socialLinks: computed('person.social', function() {
    let social = get(this, 'person.social') || [];
    return toSocialLinks(social);
  }),
  // END-SNIPPET
});
