import Ember from 'ember';

export function capitalizeWord([ value ]){
  if ( value ) {
      return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

export default Ember.Helper.helper(capitalizeWord);
