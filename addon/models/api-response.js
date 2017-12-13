import DS from 'ember-data';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import { readOnly  } from 'ember-computed';
import { totalPages } from 'nypr-publisher-lib/utils/math-util';

export default DS.Model.extend({
  // BEGIN-SNIPPET api-response-fields
  teaseList: DS.hasMany('story', {async: false}),
  story: DS.belongsTo('story', {async: false}),
  appearances: readOnly('appearance'),
  appearance: DS.hasMany('appearance', {async: false}),
  aboutPage: DS.belongsTo('about-page', {async: false}),
  contentType: computed(function() {
    let teaseList = get(this, 'teaseList.length');
    let appearances = get(this, 'appearances.length');
    let story = get(this, 'story');
    let id = get(this, 'id');

    if (teaseList) {
      return 'story-list';
    }

    if (/\/about\/1/.test(id)) {
      return 'about-page';
    }

    if (story) {
      return 'story-detail';
    }

    if (appearances) {
      return 'appearance-list';
    }
  }),
  page: computed('contentType', function() {
    if (['story-detail', 'about-page'].includes(this.get('contentType'))) {
      return this.store.createRecord('django-page', {
        text: this.get('aboutPage.escapedBody') || this.get('story.escapedBody')
      });
    }
  }),
  totalCount: DS.attr('number'),
  totalPages: computed('totalCount', {
    get() {
      const total = get(this, 'totalCount');
      return totalPages(total);
    }
  }),
  // END-SNIPPET
});
