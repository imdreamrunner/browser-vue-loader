import another from './another-module.js';

export function currentModuleFunction() {
  return 1;
}

export function loadedFromOtherModule() {
  return another;
}

