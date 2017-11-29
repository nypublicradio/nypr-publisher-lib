import Ember from 'ember';

// Truncate a string but end with a full word.

export function truncate([text, maxLength=1000, ellipsis='']/*, hash*/) {
   if (text.length <= maxLength) {
    return text
  } else {
    let sliced = text.slice(0, maxLength);
    if (text.charAt(maxLength) !== ' ') {
      let lastSpace = sliced.lastIndexOf(' ');
      sliced = text.slice(0, lastSpace)
    }
    return `${sliced}${ellipsis}`
  }
}

export default Ember.Helper.helper(truncate);
