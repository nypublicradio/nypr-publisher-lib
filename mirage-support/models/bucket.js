import { Model, hasMany } from 'ember-cli-mirage';

export default Model.extend({
  bucketItems : hasMany({ polymorphic: true })
});
