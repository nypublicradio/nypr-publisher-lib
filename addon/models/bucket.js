import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  // BEGIN-SNIPPET bucket-fields
  slug: attr('string'),
  title: attr('string'),
  editLink: attr('string'),
  bucketItems: hasMany('bucketItem', {async: false, polymorphic: true, inverse: null})
  // END-SNIPPET
});
