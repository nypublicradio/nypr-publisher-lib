import Ember from 'ember';
import layout from '../templates/components/playlist-item';

export default Ember.Component.extend({
  layout,
  /* entry comes in as seconds, convert to ms */
  entryLengthMilliseconds: Ember.computed('item.catalogEntry.length', function() {
    return this.get('item.catalogEntry.length') * 1000;
  }),
 
});
