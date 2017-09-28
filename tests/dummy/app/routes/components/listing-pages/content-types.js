import Ember from 'ember';
import {
  DUMMY_STORY_1,
  DUMMY_STORY_2,
  ABOUT_PAGE
 } from '../../../fixtures';


export default Ember.Route.extend({
  model() {
    // BEGIN-SNIPPET about-page-api-response
    let aboutApiResponse = this.store.createRecord('api-response', {
      id: 'shows/bl/about/1',
      aboutPage: this.store.createRecord('about-page', ABOUT_PAGE)
    });
    // END-SNIPPET
    
    return {
      aboutApiResponse,
    };
  }
});
