import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  title() {
    return faker.lorem.words(1);
  },
  url() {
    return faker.lorem.words(1);
  }
});
