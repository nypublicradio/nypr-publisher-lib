import Component from '@ember/component';
import layout from '../templates/components/active-html';
import { schedule } from '@ember/runloop';
import { computed } from '@ember/object';

export default Component.extend({
  layout,
  html: "",
  isFastBoot: true,
  unescapedHTML: computed('html', function() {
     return this.get('html').replace(/\\x3C\/script>/g, '</script>');
  }),
  didInsertElement() {
    this.set('isFastBoot', false)
    let html = this.get('unescapedHTML');
    let element = this.$();
    // element.empty();
    schedule('render', () => {
      element.append(html);
    });
  }
});
