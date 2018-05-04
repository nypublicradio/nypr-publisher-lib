import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  type: 'list',
  teaseList: [],
  story: null,
  totalCount() {
    return this.teaseList ? this.teaseList.length : 0;
  },
  pageSize: 10,
  totalPages() {
    let pages = Math.ceil(this.totalCount / this.pageSize);
    return isNaN(pages) ? 0 : pages;
  },
});
