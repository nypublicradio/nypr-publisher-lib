import DS from 'ember-data';
import attr from 'ember-data/attr';
import get from 'ember-metal/get';
import computed from 'ember-computed';
import toSocialLinks from 'nypr-publisher-lib/utils/to-social-links'

export default DS.Model.extend({
  appearanceType: attr('string'),
  person: attr(),
  socialLinks: computed('person.social', function() {
    let social = get(this, 'person.social') || [];
    return toSocialLinks(social);
  }),
});
