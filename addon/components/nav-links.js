import { A } from '@ember/array';
import $ from 'jquery';
import { computed, set, get } from '@ember/object';
import Component from '@ember/component';
import { run } from '@ember/runloop';
import config from 'ember-get-config';
import layout from '../templates/components/nav-links';

export default Component.extend({
  layout,
  tagName: 'nav',
  classNames: ['nav-links'],
  classNameBindings: ['xScrollable'],
  didChangeIndex: () => {},
  parsedLinks: computed('links', function() {
    let links = A(get(this, 'links'));
    return links.map(i => {
      if (typeof i.href === 'string' && i.href.indexOf(config.webRoot) === 0) {
        // make sure the parsed path has a leading slash
        i.href = i.href.replace(config.webRoot, '').replace(/^([^/]+)/, '/$1');
        return i;
      } else {
        return i;
      }
    });
  }),
  init() {
    this._super(...arguments);
    // fallback to null if defaultSlug is undefined because a linkrolLlink without
    // a navSlug key will match on `undefined` in `findBy` below
    let defaultSlug = get(this, 'defaultSlug') || null;
    let links = A(get(this, 'links'));

    this.links = links;

    let defaultIndex = links.indexOf(links.findBy('nav-slug', defaultSlug));
    set(this, 'activeTabIndex', defaultIndex === -1 ? 0 : defaultIndex);
  },

  didInsertElement() {
    run.scheduleOnce('afterRender', this, 'handleResize');

    // so we can explicitly remove this at destroy-time
    set(this, 'boundResizeHandler', run.bind(this, 'handleResize'));
    $(window).on('resize', get(this, 'boundResizeHandler'));
  },

  willDestroyElement() {
    $(window).off('resize', get(this, 'boundResizeHandler'));
  },

  handleResize() {
    let list = Array.from(this.$('.nav-links__list-item'));
    let el = this.element;
    let listWidth = list.map(n => $(n).outerWidth(true)).reduce((a, b) => a + b, 0);

    if (listWidth > el.getBoundingClientRect().width) {
      set(this, 'xScrollable', true);
    } else {
      set(this, 'xScrollable', false);
    }
  },

  actions: {
    moveBar: function(index, slug) {
      let currentIndex = this.get('activeTabIndex', index);
      if (slug && index !== currentIndex) {
        this.set('activeTabIndex', index);
        this.get('didChangeIndex')(index)
      }
    }
  }
});
