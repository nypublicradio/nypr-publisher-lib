import Component from '@ember/component';
import layout from '../templates/components/active-html';
import { inject as service } from '@ember/service';
import { schedule } from '@ember/runloop';
import { computed } from '@ember/object';
import { reads } from '@ember/object/computed';

export default Component.extend({
  layout,
  html: "",
  fastboot: service(),
  isFastBoot: reads('fastboot.isFastBoot'),
  unescapedHTML: computed('html', function() {
     return this.get('html').replace(/\\x3C\/script>/g, '</script>');
  }),
  didInsertElement() {
    let html = this.get('unescapedHTML');
    schedule('render', () => {
      let element = this.$();
      element.empty();
      element.append(html);
    });
  }
});
