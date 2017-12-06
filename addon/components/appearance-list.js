import Component from '@ember/component';
import layout from '../templates/components/appearance-list';

export default Component.extend({
  layout,
  classNames: ['appearance-list'],
  attributeBindings: ['data-test-selector'],
  'data-test-selector': 'appearance-list'
});
