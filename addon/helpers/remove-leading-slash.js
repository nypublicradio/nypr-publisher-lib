import Ember from 'ember';

export function removeLeadingSlash([ string ] /*, hash */) {
  return string.slice(1);
}

export default Ember.Helper.helper(removeLeadingSlash);
