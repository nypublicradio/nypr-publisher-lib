import DS from 'ember-data';
import { computed, get } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default DS.Model.extend({
  // BEGIN-SNIPPET api-response-fields
  teaseList: DS.hasMany('bucketItem', {async: false, polymorphic: true, inverse: null}),
  // ^inverse:null here because bucketItem children don't keep track of their containers.
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

    if (/\/about\/?1?(\?[\S]+)?$/.test(id)) {
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
  totalPages: DS.attr('number'),
  pageSize: DS.attr('number')
  // END-SNIPPET
});
