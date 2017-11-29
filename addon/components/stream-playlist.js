import Component from 'ember-component';
import computed, { readOnly } from 'ember-computed';
import get from 'ember-metal/get';
import { A } from 'ember-array/utils';
import layout from '../templates/components/stream-playlist';

const HOMEPAGES = {
  // These don't seem to be part of an api
  // Putting them here for now since this is the only component that uses them
  'wqxr':             'http://www.wqxr.org',
  'q2':               'http://www.wqxr.org/series/q2/',
  'wqxr-special':     'http://www.wqxr.org/blogs/operavore/',
  'jonathan-channel': 'http://www.wnyc.org/series/jonathan-channel'
}

export default Component.extend({
  layout,
  stream: null,
  homepage: computed('stream', function() {
    return HOMEPAGES[get(this, 'stream.id')]
  }),
  currentItem: readOnly('stream.currentPlaylistItem.playlistEntryId'),
  historyItems: computed('stream.playlist.items.[]', 'currentItem', function() {
    let currentId = this.get('currentItem');
    let playlist = this.get('stream.playlist.items');
    if (!playlist) {
      return [];
    }

    // ember's A does not return an ember array
    let historyItems = A(playlist.filter(i => Date.now() / 1000 > i.startTimeTs))
      .rejectBy('playlistEntryId', currentId);

    return A(historyItems)
      .sortBy('startTimeTs')
      .reverse();
  }),
});
