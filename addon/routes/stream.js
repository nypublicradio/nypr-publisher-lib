import Route from 'ember-route';

export default Route.extend({
  // googleAds: service(),

  titleToken: 'Listen Live to WNYC, WQXR, Q2, Operavore, NJPR, and the Jonathan Channel',

  model() {
    return this.store.findAll('stream');
  }

  // afterModel() {
    // this.get('googleAds').doTargeting();
  // }
});
