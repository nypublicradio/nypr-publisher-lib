import Ember from 'ember';
import layout from '../templates/components/show-tease';

export default Ember.Component.extend({
  layout,
  showUrl: Ember.computed('show.slug', function(){
    return '/shows/' + this.get('show.slug');
  })
});
