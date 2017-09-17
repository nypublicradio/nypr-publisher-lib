import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
  // BEGIN-SNIPPET bucket-fields
  slug: attr('string'),
  title: attr('string'),
  bucketItems: attr()
  // END-SNIPPET
});
