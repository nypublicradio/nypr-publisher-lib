import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      // BEGIN-SNIPPET nav-links-params
      navRoot: 'components.listing-pages.nav-links',
      linkroll: [{
        'nav-slug': 'foo',
        title: 'More Foo'
      }, {
        'nav-slug': 'bar',
        title: 'A List of Bar'
      }, {
        href: 'http://www.wnyc.org/about',
        title: 'About WNYC'
      }]
      // END-SNIPPET
    }
  }
});
