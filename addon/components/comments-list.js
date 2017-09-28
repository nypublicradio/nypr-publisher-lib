import Ember from 'ember';
import layout from '../templates/components/comments-list';

export default Ember.Component.extend({
  layout,
  classNames: ['comment-list'],
  attributeBindings: ['data-test-selector'],
  'data-test-selector': 'comment-list'
});
