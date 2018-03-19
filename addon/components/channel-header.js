import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';
import layout from '../templates/components/channel-header';

export default Component.extend({
  layout,

  classNames:         ['channel-header'],
  subscribeOptions:   readOnly('model.podcastLinks'),
  donationOption:     readOnly('model.donate'),
  airings:            readOnly('model.scheduleSummary')
});
