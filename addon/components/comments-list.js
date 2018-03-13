import Component from '@ember/component';
import layout from '../templates/components/comments-list';

export default Component.extend({
  layout,
  classNames: ['comment-list'],
  attributeBindings: ['data-test-selector'],
  'data-test-selector': 'comment-list'
});
