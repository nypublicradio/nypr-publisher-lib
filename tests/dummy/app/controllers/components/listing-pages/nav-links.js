import Controller from 'ember-controller';

export default Controller.extend({
  linkroll: [{
    'nav-slug': 'foo',
    title: 'More Foo'
  }, {
    'nav-slug': 'bar',
    title: 'A List of Bar'
  }, {
    href: 'http://www.wnyc.org/about',
    title: 'About WNYC'
  }],
  navRoot: 'show-slug',
  actions: {
    navSlugTransition() {
      
    }
  }
});
