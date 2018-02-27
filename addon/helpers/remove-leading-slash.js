import { helper } from '@ember/component/helper';

export function removeLeadingSlash([ string ] /*, hash */) {
  return string.slice(1);
}

export default helper(removeLeadingSlash);
