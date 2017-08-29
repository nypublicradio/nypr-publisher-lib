import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import computed, { readOnly } from 'ember-computed';
import get from 'ember-metal/get';

const WQXR_slugs = ["wqxr","q2","jonathan-channel","wqxr-special","wqxr-special2"];
// wqxr-special = Operavore,
// wqxr-special2 = Holiday Channel
const WNYC_slugs = ["wnyc-fm939", "wnyc-am820"];

export default Model.extend({
  audioType:            'livestream',

  hasPlaylists:         attr('boolean'),
  imageLogo:            attr('string'),
  scheduleUrl:          attr('string'),
  name:                 attr('string'),
  shortDescription:     attr('string'),
  slug:                 attr('string'),
  whatsOn:              attr('number'),
  position:             attr('number'),
  playlistUrl:          attr('string'),
  cmsPK:                attr('number'),
  twitterHandle:        attr('string'),

  currentShow:          attr(),
  currentPlaylistItem:  attr(),
  future:               attr(),
  urls:                 attr(),

  currentStory:         belongsTo('story'),
  playlist:             belongsTo('playlist'),

  story:                readOnly('currentStory'),
  audioBumper:          attr('string'),

  isWQXR:               computed('slug', function(){
    return WQXR_slugs.includes(get(this, 'slug'));
  }),

  isWNYC:               computed('slug', function(){
    return WNYC_slugs.includes(get(this, 'slug'));
  }),

  liveWQXR:             computed('isWQXR', 'whatsOn', function(){
    return get(this, 'isWQXR') && (get(this, 'whatsOn') > 0);
  }),

  shareMetadata:        computed('currentShow', 'currentPlaylistItem', function() {
    let shareText = '';
    let shareUrl = '';
    let analyticsCode = '';

    let entry = get(this, 'currentPlaylistItem.catalogEntry');
    if (entry) {
      shareText = `${entry.title} - ${entry.composer.name}`;
      shareUrl = 'http://www.wnyc.org/streams/' + get(this, 'slug');
    } else {
      shareText = get(this, 'currentShow.title');
      shareUrl = get(this, 'currentShow.url');
    }

    return ({shareText, shareUrl, analyticsCode});
  }),

  currentComposer:      computed('currentPlaylistItem', function() {
    return get(this, 'currentPlaylistItem.catalogEntry.composer');
  }),
  currentPiece:         computed('currentPlaylistItem', function() {
    return get(this, 'currentPlaylistItem.catalogEntry.title');
  }),

  forListenAction(data = {}) {
    return get(this, 'currentStory').then(s => {
      data.current_audio_position = 0; // stream should always report 0
      return Object.assign({
        audio_type: 'livestream',
        cms_id: s && s.get('cmsPK'),
        item_type: s && s.get('itemType'), // episode, article, segment
        stream_id: get(this, 'cmsPK'),
      }, data);
    });
  }
});
