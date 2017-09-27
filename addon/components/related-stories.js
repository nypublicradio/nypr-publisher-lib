import Ember from 'ember';
import layout from '../templates/components/related-stories';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Ember.Component.extend({
  tagName: 'section',
  layout,
  classNames: ['related-stories'],

  stories: Ember.computed('getStories', {
    get() {
      get(this, 'getStories')().then(stories => {
        set(this, 'stories', stories);
        // TODO: make this an app concern
        if (this.$().imagesLoaded) {
          Ember.run.scheduleOnce('afterRender', this, this.imagesLoaded);
        }
      });
    },
    set(k,v) { return v; }
  }),

  imagesLoaded() {
    // here we are, promise fulfilled, DOM rendered, so let's register this
    // call back to run once all the <img/> els are finished downloading
    this.$().imagesLoaded()
      .progress(function(instance, image) {
        Ember.$(image.img).addClass('is-loaded');
      });
  }
});
