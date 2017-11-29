import Ember from 'ember';
import layout from '../templates/components/episode-list';

export default Ember.Component.extend({
  layout,
  classNames: ['episode-list'],
  attributeBindings: ['data-test-selector'],
  'data-test-selector': 'episode-list'
});
