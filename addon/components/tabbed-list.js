import Component from '@ember/component';
import { get, getWithDefault, set, computed } from '@ember/object';
import layout from '../templates/components/tabbed-list';

export default  Component.extend({
  layout,
  defaultTab: 0,

  init() {
    this._super(...arguments);
    this.tabTitles = getWithDefault(this, 'tabTitles', []);
    this.childComponents = getWithDefault(this, 'childComponents', []);
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
      if (get(this, 'onChooseTab')) {
          this.send('onChooseTab', tabLabel);

          // get(this, 'metrics').trackEvent('GoogleAnalytics', {
          //   category: 'Persistent Player',
          //   action: 'Click',
          //   label: `Switch to ${tabLabel} Tab`
          // });

      }
    }
  }
});
