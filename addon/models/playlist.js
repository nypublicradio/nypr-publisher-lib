import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
  // BEGIN-SNIPPET playlist-fields
  stream: DS.belongsTo('stream'),
  items: DS.attr()
  // END-SNIPPET
});
