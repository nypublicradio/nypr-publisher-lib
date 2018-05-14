import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  teaseList: hasMany('bucketItem'),
  story: belongsTo('story')
});
