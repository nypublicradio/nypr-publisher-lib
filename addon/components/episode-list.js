import Component from '@ember/component';
import layout from '../templates/components/episode-list';

export default Component.extend({
  layout,
  classNames: ['episode-list'],
  attributeBindings: ['data-test-selector'],
  'data-test-selector': 'episode-list'
});
