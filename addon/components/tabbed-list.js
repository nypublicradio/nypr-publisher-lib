import service from 'ember-service/inject';
import Component from 'ember-component';
import computed from 'ember-computed';
import set from 'ember-metal/set';
import get from 'ember-metal/get';
import layout from '../templates/components/tabbed-list';

export default  Component.extend({
  layout,
  metrics: service(),
  tabTitles: [],
  childComponents: [],
  defaultTab: 0,

  init() {
    this._super(...arguments);
    set(this, 'activeTabIndex', get(this, 'defaultTab'));
  },

  activeComponent: computed('activeTabIndex', 'childComponents', function() {
    return get(this, 'childComponents')[get(this, 'activeTabIndex')];
  }),

  actions: {
    chooseTab(index) {
      set(this, 'activeTabIndex', index);
      let tabTitle = this.get('tabTitles')[index];
      let titleMap = {
        "My Queue": "Queue",
        "My Listening History": "History"
      };
      let tabLabel = titleMap[tabTitle] || tabTitle;
      get(this, 'metrics').trackEvent('GoogleAnalytics', {
        category: 'Persistent Player',
        action: 'Click',
        label: `Switch to ${tabLabel} Tab`
      });
    }
  }

});
