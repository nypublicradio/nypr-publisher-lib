import Component from '@ember/component';
import layout from '../templates/components/appearance-credit';

const AppearanceCreditComponent = Component.extend({
  layout,
  tagName: ''
});

AppearanceCreditComponent.reopenClass({
  positionalParams: ['creditText', 'appearances']
});

export default AppearanceCreditComponent;
