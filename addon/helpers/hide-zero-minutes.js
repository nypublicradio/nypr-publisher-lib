import moment from 'moment';
import Ember from 'ember';

export function hideZeroMinutes([ timestamp ]/*, hash*/) {
  let date = moment(timestamp);
  if (date.minutes() === 0) {
    return date.format('h a');
  } else {
    return date.format('h:mm a');
  }
}

export default Ember.Helper.helper(hideZeroMinutes);
