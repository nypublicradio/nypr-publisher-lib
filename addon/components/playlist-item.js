import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/playlist-item';

export default Component.extend({
  layout,
  /* entry comes in as seconds, convert to ms */
  entryLengthMilliseconds: computed('item.catalogEntry.length', function() {
    return this.get('item.catalogEntry.length') * 1000;
  }),
 
});
