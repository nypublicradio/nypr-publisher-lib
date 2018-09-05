import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { computed, get } from '@ember/object';
import  { readOnly } from '@ember/object/computed'

export default Model.extend({
  // BEGIN-SNIPPET stream-fields
  audioType:            'livestream',

  alwaysBroadcasting:   attr('boolean'),
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
  sourceTags:           attr('string', {defaultValue: ''}),
  sitePriority:         attr('number'),
  currentShow:          attr(),
  currentPlaylistItem:  attr(),
  future:               attr(),
  urls:                 attr(),

  currentStory:         belongsTo('story'),
  playlist:             belongsTo('playlist'),

  story:                readOnly('currentStory'),
  audioBumper:          attr('string'),

  isWQXR:               computed('sourceTags', function(){
    return get(this, 'sourceTags').includes('wqxr_site');
  }),

  isWNYC:               computed('sourceTags', function(){
    return get(this, 'sourceTags').includes('wnyc_site');
  }),

  liveWQXR:             computed('isWQXR', 'whatsOn', function(){
    return get(this, 'isWQXR') && (get(this, 'whatsOn') > 0);
  }),

  liveWNYC:             computed('isWNYC', 'whatsOn', function(){
    return get(this, 'isWNYC') && ((get(this, 'whatsOn') > 0) || (get(this, 'alwaysBroadcasting')));
  }),

  currentComposer:      computed('currentPlaylistItem', function() {
    return get(this, 'currentPlaylistItem.catalogEntry.composer');
  }),
  currentPiece:         computed('currentPlaylistItem', function() {
    return get(this, 'currentPlaylistItem.catalogEntry.title');
  }),

  forListenAction(data = {}) {
    return this.get('currentStory').then(s => {
      data.current_audio_position = 0; // stream should always report 0
      return Object.assign({
        audio_type: 'livestream',
        cms_id: s && s.get('cmsPK'),
        item_type: s && s.get('itemType'), // episode, article, segment
        stream_id: this.get('cmsPK'),
      }, data);
    });
  }
  // END-SNIPPET
});
