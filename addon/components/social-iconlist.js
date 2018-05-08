import Component from '@ember/component';
import layout from '../templates/components/social-iconlist';

export default Component.extend({
  layout,
  tagName: "ul",
  classNames: ["social-iconlist"],
  attributeBindings: ['data-category', 'data-action', 'data-label', 'data-value']
});
