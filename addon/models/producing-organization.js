import DS from 'ember-data';

export default DS.Model.extend({
  // BEGIN-SNIPPET producing-organization-fields
  name: DS.attr('string'),
  url: DS.attr('string'),
  logo: DS.belongsTo('image')
  // END-SNIPPET
});
