import { helper } from '@ember/component/helper';
import { camelize } from '@ember/string';

export function camelizeKeys([ source ]/*, hash*/) {
  let dest = {};
  Object.keys(source).forEach(k => dest[camelize(k)] = source[k]);
  return dest;
}

export default helper(camelizeKeys);
