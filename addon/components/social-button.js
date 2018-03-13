import Component from '@ember/component';
import $ from 'jquery';
import { computed, get } from '@ember/object';
import { equal } from '@ember/object/computed';
import layout from '../templates/components/social-button';

export default Component.extend({
  layout,
  tagName: '',
  isTwitter: equal('item.service', 'twitter'),
  iconname: computed('item.service', function() {
    let svc = get(this, 'item.service');
    return svc === 'email' ? 'envelope' : svc;
  }),
  url: computed('item.{service,contactString}', function() {
    let svc = get(this, 'item.service');
    let user = get(this, 'item.contactString');

    switch(svc) {
      case 'facebook':
        return `http://facebook.com/${user}`;
      case 'instagram':
        return `http://instagram.com/${user}`;
      case 'email':
        return `mailto:${user}`;
      default:
        return null;
    }
  }),

  didInsertElement() {
    if (get(this, 'isTwitter')) {
      this._insertTwitter();
    }
  },
  willDestroyElement() {
    this.get('_script').remove();
  },

  _insertTwitter() {
    let $s = $('<script/>', { id: 'twitter-wjs', src: '//platform.twitter.com/widgets.js' });
    $(document).find('head').prepend($s);
    this.set('_script', $s);
  }
});
