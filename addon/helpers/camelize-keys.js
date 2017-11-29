import Ember from 'ember';

export function camelizeKeys([ source ]/*, hash*/) {
  let dest = {};
  Object.keys(source).forEach(k => dest[Ember.String.camelize(k)] = source[k]);
  return dest;
}

export default Ember.Helper.helper(camelizeKeys);
