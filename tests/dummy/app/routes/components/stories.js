import Ember from 'ember';
import config from 'dummy/config/environment';
import rsvp from 'rsvp';

// BEGIN-SNIPPET story-tease-object
const DUMMY_STORY = {
  id: 'rebar',
  audio: 'https://www.podtrac.com/pts/redirect.mp3/audio.wnyc.org/bl/bl051914bpod.mp3',
  audioAvailable: true,
  audioDurationReadable: '1 hr',
  cmsPK: 371424,
  editLink: "cms/segment/371424",
  headers: {
    "brand": {
      "url": "http://www.wnyc.org/shows/bl",
      "title": "The Brian Lehrer Show",
      "slug": "bl",
    },
    "links": [{
      "url": "http://localhost:4567/blogs/scrapbook",
      "title": "Huh. (The Brian Lehrer Show Blog)",
      "item-type": "blog",
      "slug": "scrapbook"
    },{
      "url": "http://www.wnyc.org/shows/bl",
      "title": "The Brian Lehrer Show",
      "itemType": "show",
      "slug": "bl"
    }]
  },
  imageMain: {
    "crop": "l",
    "template": "https://media2.wnyc.org/i/%s/%s/%s/%s/1/13958409859_774dfdc534_b.jpg",
  },
  newsdate: "2014-05-19T00:00:00-04:00",
  tease: "When the owner of reBar, a DUMBO gastropub and wedding venue, disappeared two weeks ago with upwards of $150,000 in deposits, couples and employees were left in the lurch. The restaurateur has since turned himself in and paid bail but now faces up to 15 years in prison.",
  title: "reBar: Closed and Bankrupt",
  url: "http://www.wnyc.org/story/rebar/",
}
// END-SNIPPET

// BEGIN-SNIPPET latest-story
// quick n dirty object copy
const LATEST_STORY = JSON.parse(JSON.stringify(DUMMY_STORY));
LATEST_STORY.isLatest = true;
// END-SNIPPET

// BEGIN-SNIPPET related-to
const STORY_ID = 371424;
// END-SNIPPET

export default Ember.Route.extend({
  model() {
    return this.store.findRecord('story', 'rebar').then(story => {
      return rsvp.hash({
        realStory: story,
        item: DUMMY_STORY,
        latestItem: LATEST_STORY,
        // BEGIN-SNIPPET get-related-stories
        getRelatedStories: () => this.store.query('story', {related: {itemId: STORY_ID, limit: 5}}),
        // END-SNIPPET
        // BEGIN-SNIPPET get-comments
        getComments: () =>  this.store.query('comment', { itemTypeId: story.get('itemTypeId'), itemId: story.get('cmsPK') })
        // END-SNIPPET
      });
    });
  },
  setupController(controller) {
    this._super(...arguments);
    controller.set('config', config);
  }
});
