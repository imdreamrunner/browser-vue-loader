import another from './another-module.js';
import _ from 'lodash';

export function currentModuleFunction() {
  return 1;
}

export function loadedFromOtherModule() {
  return another;
}

export function importFromLodash() {
  return _.partition([1, 2, 3, 4], n => n % 2);
}
