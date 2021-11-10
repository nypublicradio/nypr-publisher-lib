import DS from 'ember-data';

export default DS.Model.extend({
  // BEGIN-SNIPPET flat-page-fields
  url: DS.attr('string'),
  title: DS.attr('string'),
  content: DS.attr('string'),
  superchunkHeadPlusContent: DS.attr('string')
  // END-SNIPPET
});
