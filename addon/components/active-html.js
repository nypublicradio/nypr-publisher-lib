import Component from '@ember/component';
import layout from '../templates/components/active-html';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  activatedHTML: computed('html', function() {
     return this.get('html').replace(/\\x3C\/script>/g, '</script>');
  }),
  didRender() {
    let html = this.get('activatedHTML');
    let element = this.$();
    element.empty();
    element.append(html);
  }
});
