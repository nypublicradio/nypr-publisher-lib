import Component from '@ember/component';
import layout from '../templates/components/download-link';
import { alias } from '@ember/object/computed';

export default Component.extend({
  layout,
  story: null,
  icon: 'download',
  linkText: 'Download',
  deviceIsIos: !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform),
  shouldHide: alias('deviceIsIos')
});
