import Route from '@ember/routing/route';

export default Route.extend({
  redirect() {
    window.scrollTo(0, 0);
    this.transitionTo('mas.models');
  }
});
