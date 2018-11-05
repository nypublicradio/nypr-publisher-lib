import Component from '@ember/component';
import layout from '../templates/components/active-html';
import { schedule } from '@ember/runloop';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  html: "",
  unescapedHTML: computed('html', function() {
     return this.get('html').replace(/\\x3C\/script>/g, '</script>');
  }),
  didInsertElement() {
    let html = this.get('unescapedHTML');
    let element = this.$('.html');
    schedule('render', () => {
      element.append(html);
    });
  },
  didUpdateAttrs() {
    let html = this.get('unescapedHTML');
    let element = this.$('.html');
    element.empty();
    schedule('render', () => {
      element.append(html);
    });
  }
});
