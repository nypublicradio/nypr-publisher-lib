import DS from 'ember-data';

export default DS.Model.extend({
  // BEGIN-SNIPPET link-roll-fields
  slug: DS.attr('string'),
  title: DS.attr('string'),
  linkroll: DS.attr(),
  // END-SNIPPET
});
