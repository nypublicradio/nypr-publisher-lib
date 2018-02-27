import { computed } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/show-tease';

export default Component.extend({
  layout,
  showUrl: computed('show.slug', function(){
    return '/shows/' + this.get('show.slug');
  })
});
