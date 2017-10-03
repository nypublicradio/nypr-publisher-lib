import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('numeric-duration', 'helper:numeric-duration', {
  integration: true
});

let testCases = [{
  description: 'should display correct time for 0',
  inputMs: 0,
  expected: '0:00'
},{    description: 'should display correct time for seconds < 10',
  inputMs: 1 * 1000,
  expected: '0:01'
},{
  description: 'should display correct time for seconds > 10',
  inputMs: 10 * 1000,
  expected: '0:10'
},{
  description: 'should display correct time for minutes < 10',
  inputMs: 1 * 60 * 1000,
  expected: '1:00'
},{
  description: 'should display correct time for minutes > 10',
  inputMs: 10 * 60 * 1000,
  expected: '10:00'
},{
  description: 'should display correct time for hours',
  inputMs: 1 * 60 * 60 * 1000,
  expected: '1:00:00'
}];

testCases.forEach(testCase => {
  test(testCase.description, function(assert) {
    this.set('inputValue', testCase.inputMs)
    this.render(hbs`{{numeric-duration inputValue}}`);

    assert.equal(this.$().text().trim(), testCase.expected);
  });
});
