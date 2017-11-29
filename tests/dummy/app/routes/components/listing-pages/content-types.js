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
      id: 'shows/foo/about/1',
      aboutPage: this.store.createRecord('about-page', ABOUT_PAGE)
    });
    // END-SNIPPET
    // BEGIN-SNIPPET tease-list-api-response
    let listApiResponse = this.store.createRecord('api-response', {
      teaseList: [
        this.store.createRecord('story', DUMMY_STORY_1),
        this.store.createRecord('story', DUMMY_STORY_2),
      ]
    });
    // END-SNIPPET
    // BEGIN-SNIPPET detail-api-response
    let detailApiResponse = this.store.createRecord('api-response', {
      story: this.store.createRecord('story', DUMMY_STORY_2)
    });
    // END-SNIPPET
    
    return {
      aboutApiResponse,
      listApiResponse,
      detailApiResponse
    };
  }
});
