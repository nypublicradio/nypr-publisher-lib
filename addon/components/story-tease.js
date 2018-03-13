import { inject } from '@ember/service';
import moment from 'moment';
import Component from '@ember/component';
import { and, equal, readOnly, or } from '@ember/object/computed';
import { computed, get, set, getProperties} from '@ember/object';
import { imageTemplate } from 'nypr-ui/helpers/image-template';
import { htmlSafe } from '@ember/string';
import layout from '../templates/components/story-tease';

const STATUSES = {
  LIVE: 'On Air Now',
  LATEST: 'Latest Episode',
  UPCOMING: 'Upcoming Episode'
};

export default Component.extend({
  layout,
  whatsOn:            inject(),

  status:             null,
  streamSlug:         null,
  streamName:         null,
  isFeatured:         false,
  allowQueueing:      false,

  isLive:             equal('status', STATUSES.LIVE),
  isLatest:           readOnly('item.isLatest'),
  isListenableNow:    or('item.audioAvailable', 'isLive'),
  // BEGIN-SNIPPET is-fancy-featured-cp
  isFancyFeatured:    and('item.largeTeaseLayout', 'item.imageMain', 'isFeatured'),
  // END-SNIPPET


  tagName:            'article',
  classNameBindings:  [
    'featuredClasses',
    'fullScreen:story-tease--fullscreen',
    'isFeatured:story-tease--featured',
    'isFancyFeatured:story-tease--fancyfeatured',
    'flipped:story-tease--flipped'
  ],
  classNames:         ['story-tease'],

  itemId: computed('isLive', 'streamSlug', 'item.id', function() {
    return get(this, 'isLive') ? get(this, 'streamSlug') : get(this, 'item.id');
  }),
  isListenableEventually: computed('status', function() {
    const status = get(this, 'status');
    const audioEventually = get(this, 'item.audioEventually');
    return status !==  STATUSES.LIVE && status !== null && audioEventually;
  }),
  featuredClasses: computed('isFeatured', 'item.largeTeaseLayout', 'media.isSmallAndUp', function() {
    const isFeatured = get(this, 'isFeatured');
    const lgTease = get(this, 'item.largeTeaseLayout');
    const isSmallAndUp = get(this, 'media.isSmallAndUp');
    if (isFeatured && lgTease && isSmallAndUp) {
      return 'box--dark box--featured';
    } else if (isFeatured) {
      return 'box--nearwhite box--featured';
    }
  }),
  showParent: computed('parentTitle', 'item.headers.brand.title', function() {
    let parentTitle = get(this, 'parentTitle');
    let brandTitle = get(this, 'item.headers.brand.title');
    return parentTitle !== brandTitle;
  }),
  playButton: computed('isFeatured', 'flipped', function() {
    if (this.get('isFeatured') || this.get('flipped')) {
      return 'blue-boss';
    } else {
      return 'blue-minion';
    }
  }),
  endtimeLabel: computed('endtime', function() {
    const endtime = get(this, 'endtime');
    const timeObj = moment(endtime);

    if (timeObj.minutes() === 0) {
      return `until ${timeObj.format('h A')}`;
    } else {
      return `until ${timeObj.format('h:mm A')}`;
    }
  }),
  fancyFeaturedBackground: computed('item.imageMain', function() {
    let image = get(this, 'item.imageMain');
    let {
      template,
      crop
    } = getProperties(image, 'template', 'crop');
    return htmlSafe(`background-image: url(${imageTemplate([template, 0, 400, crop])});`);
  }),

  didRender() {
    this._super(...arguments);
    this._checkWhatsOn();
  },

  _checkWhatsOn() {
    const story = get(this, 'item');
    const pk = get(story, 'cmsPK');
    const whatsOn = get(this, 'whatsOn');

    if (!get(this, 'isLatest')) {
      return;
    }

    whatsOn.isLive(pk).then(isLive => this._updateStatus(isLive));
  },

  _updateStatus(results) {
    const [isLive, endtime, streamSlug, streamName] = results;
    if (isLive) {
      set(this, 'status', STATUSES.LIVE);
      set(this, 'endtime', endtime);
      set(this, 'streamSlug', streamSlug);
      set(this, 'streamName', streamName);
    } else if (this._isUpcoming()){
      set(this, 'status', STATUSES.UPCOMING);
    } else {
      set(this, 'status', STATUSES.LATEST);
    }
  },

  _isUpcoming() {
    const datetime = get(this, 'item.newsdate');
    const itemdate = new Date(datetime);
    const itemdateEpoch = itemdate.getTime();
    const now = new Date();
    const nowEpoch = now.getTime();

    return nowEpoch < itemdateEpoch;
  }
});
