import $ from 'jquery';
import Component from 'ember-component';
import computed, { reads } from 'ember-computed';
import config from 'ember-get-config';
import fetch from 'fetch';
import layout from '../templates/components/comments-form';

export default Component.extend({
  layout,
  tagName: 'form',
  classNames: ['comment-form'],
  classNameBindings: ['isSaved:is-fadeout'],

  name: reads('userName'),
  securityURL: computed('story', 'browserId', function() {
    let story = this.get('story');
    let browserId = this.get('browserId');
    return story.commentSecurityURL(browserId);
  }),

  didInsertElement() {
    this.auth = fetch(this.get('securityURL'), {
      credentials: 'include'
    }).then(response => response.json());
  },
  hasErrors() {
    var requiredFields = [
      'name',
      'comment'
    ];

    if ( !this.get('isStaff') ) {
      requiredFields.push('email');
    }

    this.set('errors', {});

    requiredFields.forEach(function(field) {
      var val = this.get(field);
      if ( !val ) {
        this.set(`errors.${field}`, 'This field is required');
      }
    }, this);

    return Object.keys(this.get('errors')).length !== 0;
  },

  actions: {
    sendComment() {
      this.set('isDisabled', true);
      if (this.hasErrors()) {
        this.set('isDisabled', false);
        return false;
      }
      let data = this.$().serialize();
      this.auth.then(({ security_hash, timestamp }) => {
        let url = `${config.adminRoot}/comments/post/?bust_cache=${Math.random()}&id=${this.get('browserId')}`;
        let story = this.get('story');
        let metaData = {
          content_type: 'cms.' + story.get('itemType'),
          object_pk: story.get('cmsPK'),
          timestamp,
          security_hash,
          site: 1,
          honeypot: 'Dave'
        };
        let options = {
          type: 'PUT',
          url,
          xhrFields: { withCredentials: true },
          data: data + '&' + $.param(metaData)
        };
        $.ajax(options).always(function(response) {
          if ( response.errors ) {
            this.set('errors', response.errors);
            this.set('isDisabled', false);
          } else {
            this.set('isSaved', true);
            this.sendAction();
          }
        }.bind(this));
      });
    }
  }
});
