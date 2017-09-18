import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('mas', function() {
    this.route('models');
    this.route('adapters');
    this.route('serializers');
  });
  this.route('components');
  this.route('services');
});

export default Router;
