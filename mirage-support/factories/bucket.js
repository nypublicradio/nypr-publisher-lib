import { Factory, faker } from 'ember-cli-mirage';

function headerItem() {
  return {
    title: faker.lorem.words(),
    url: faker.internet.url()
  };
}

let links = Array.apply(null, Array(10)).map(headerItem);

function createBucketItem(server) {
  server.create('story', {
    slug: faker.lorem.words().dasherize(),
    title: faker.lorem.words(),
    imageMain: {
      url: faker.image.image()
    },
    headers: {
      brand: faker.random.arrayElement(links),
      links: [faker.random.arrayElement(links), faker.random.arrayElement(links)]
    },
    template: faker.random.arrayElement(['story_default', 'story_video']),
    url: faker.internet.url()
  })
}

export default Factory.extend({
  slug: () => faker.lorem.words().dasherize(),
  afterCreate(bucket, server) {
    let stories = new Array(20);
    stories.map(() => createBucketItem(server));
    bucket.bucketItems = stories;
  }
});
