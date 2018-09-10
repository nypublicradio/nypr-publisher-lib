import Component from '@ember/component';
import layout from '../templates/components/download-link';
import { alias } from '@ember/object/computed';

export default Component.extend({
  layout,
  story: null,
  icon: 'download-arrow',
  linkText: 'Download',
  shouldHide: alias('deviceIsIos'),

  didInsertElement() {
    let isIos =  !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    this.set('deviceIsIos', isIos);
  }
});
