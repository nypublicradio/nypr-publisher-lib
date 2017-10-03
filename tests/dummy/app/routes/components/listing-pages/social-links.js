import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return (
      // BEGIN-SNIPPET social-links-data
      [{
        href: "https://www.facebook.com/BrianLehrerWNYC",
        title: "facebook"
      }, {
        href: "https://twitter.com/BrianLehrer",
        title: "twitter"
      }, {
        href: "http://nypublicradio.us5.list-manage1.com/subscribe?u=4109fdd323aaac7078eadaa8f&id=4ffeb93090",
        title: "newsletter"
      }]
      // END-SNIPPET
    );
  }
});
