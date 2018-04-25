import Component from '@ember/component';
import { computed, get } from '@ember/object';
import config from 'ember-get-config';
import layout from '../templates/components/story-comments';

export default Component.extend({
  layout,
  classNames: ['story-comments'],
  adminURL: `${config.adminRoot}/admin`,

  comments: computed('getComments', {
    get() {
      this.set('isLoading', true);
      get(this, 'getComments')().then(comments => {
        this.set('comments', comments);
      }).finally(() => this.set('isLoading', false));
    },
    set(k,v) { return v; }
  }),

  didInsertElement() {
    if (get(this, 'isShowingComments')) {
      get(this, 'element').scrollIntoView();
    }
  },

  commentsCount: computed('comments.[]', 'story', function() {
    if (get(this, 'comments')) {
      return get(this, 'comments.length');
    } else {
      return get(this, 'story.commentsCount');
    }
  }),

  isShowingForm: computed({
    get() {
      return get(this, 'isShowingComments');
    },
    set(k,v) { return v; }
  }),

  isShowingComments: computed({
    get() {
      var hash = window.location.hash.slice(1).split('&');
      return hash.indexOf('comments') !== -1 || hash.indexOf('commentlist') !== -1;
    },
    set(k,v){ return v; }
  }),

  actions: {
    getComments() {
      this.set('isShowingComments', true);
      this.set('isShowingForm', true);
    },
    saveSuccess() {
      this.set('isShowingForm', false);
      this.set('isSuccess', true);
    }
  }
});
