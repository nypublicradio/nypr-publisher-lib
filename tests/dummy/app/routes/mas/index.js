import Ember from 'ember';

export default Ember.Route.extend({
  redirect() {
    window.scrollTo(0, 0);
    this.transitionTo('mas.models');
  }
});
