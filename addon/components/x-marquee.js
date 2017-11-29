import Component from 'ember-component';
import computed, { reads } from 'ember-computed';
import { imageTemplate } from 'nypr-ui/helpers/image-template';
import { htmlSafe } from 'ember-string';
import get from 'ember-metal/get';
import layout from '../templates/components/x-marquee';

export default Component.extend({
  layout,
  classNames: ['marquee'],
  bgColor: reads('model.bgColor'),
  marquee: reads('model.marqueeImage'),
  marqueeURL: computed('marquee', function() {
    let marquee = get(this, 'marquee');
    if (!marquee) {
      return;
    }
    return imageTemplate([get(marquee, 'template'), 1200,  200, get(marquee, 'crop'), 99]);
  }),
  marqueeImageCSS: computed('bgColor', 'marqueeURL', function() {
    let marqueeURL = get(this, 'marqueeURL');
    if (!marqueeURL) {
      return;
    }
    let bgColor = get(this, 'bgColor') || 'white';
    return htmlSafe(`background: url(${marqueeURL}) no-repeat center center ${bgColor};`)
  }),
  marqueeGradientCSS: computed('bgColor', function() {
    let bgColor = get(this, 'bgColor') || 'white';
    return htmlSafe(`background-image: radial-gradient(rgba(255, 255, 255,0) 200px, ${bgColor} 620px);`);
  })
});
