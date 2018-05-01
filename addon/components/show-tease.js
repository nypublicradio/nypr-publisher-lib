import Component from '@ember/component';
import layout from '../templates/components/show-tease';

export default Component.extend({
  layout,
  attributeBindings: ['data-category', 'data-action', 'data-label', 'data-value']
});
