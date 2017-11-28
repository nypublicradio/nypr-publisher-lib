import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  slug: () => faker.lorem.words(2).dasherize(),
  content: faker.lorem.sentence
});
