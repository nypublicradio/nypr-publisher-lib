import Ember from 'ember';
import layout from '../templates/components/stream-list';

export default Ember.Component.extend({
  layout,
  tagName: 'ul',
  classNames: ['stream-list']
});
