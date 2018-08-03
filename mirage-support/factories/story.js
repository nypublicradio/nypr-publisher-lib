import { Factory, faker, trait } from 'ember-cli-mirage';

function makeSegment(_, index) {
  let title = faker.lorem.words(3).capitalize();
  return {
    'audio-available': true,
    'audio-duration-reaable': `${faker.random.number(50)} min`,
    'audio-eventually': true,
    'audio-may-stream': true,
    'episode-id': faker.random.number({min: 10000, max: 50000}),
    newsdate: faker.date.recent(),
    'segment-number': index,
    slug: title.dasherize(),
    title
  };
}

function makeSeries() {
  return {
    title: () => faker.lorem.words(2),
  }
}

export default Factory.extend({
  slug(id) {
    return `story-${id}`;
  },
  itemTypeId: 24,
  itemType: 'story',
  headers() {
    return {
      brand: {
        url: faker.internet.url(),
        title: 'The Brian Lehrer Show',
      }
    };
  },
  title(id) {
    return `Story ${id}`;
  },
  body: 'Story body.',
  commentsEnabled: true,
  newsdate: faker.date.recent,
  publishAt: faker.date.recent,
  audio: () => faker.internet.url() + '.mp3',
  audioEventually: true,
  audioAvailable: true,
  audioMayEmbed: true,
  audioMayStream: true,
  cmsPK: id => id + 1,
  /* eslint-disable */
  appearances: {
    authors: [{name: 'Author 1'}, {name: 'Author 2'}]
  },
  producingOrganizations: [],
  showProducingOrgs: [],
  allProducingOrgs: [],
  series: () => Array.from(Array(3), makeSeries),
  /* eslint-enable */
  tags: () =>  faker.lorem.words(5).split(' '),
  showTitle: faker.lorem.words(3),

  withSegments: trait({
    segments: Array.from(Array(3), makeSegment)
  })
});
