import Component from '@ember/component';
import layout from '../templates/components/playlist-credit';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  tagName: 'span',
  unquotedTitle: computed('musicEntry.title', function() {
    let title = this.get('musicEntry.title');
    if (title) {
      return title.replace(/^"|"$/g,'');
    } else {
      return null;
    }
  }),
  amazonAssociatesId: 'wnycorg-20',
  amazonUrl: computed('title', function() {
    let asin = this.get('musicEntry.asin');
    let associatesId = this.get('amazonAssociatesId');
    if (asin) {
      return `http://www.amazon.com/exec/obidos/ASIN/${asin}/${associatesId}`
    } else {
      return null;
    }
  })
});
