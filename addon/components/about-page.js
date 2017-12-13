import Component from 'ember-component';
import layout from '../templates/components/about-page';

export default Component.extend({
  layout,
  tagName: 'section',
  classNames: ['about-page'],
  hidePeople: false
});
