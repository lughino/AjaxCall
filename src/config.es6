/**
 * config
 *
 * @module config
 *
 * @author Luca Pau <luca.pau82@gmail.com>
 */

import log from './log';

let _resultsPerPageMax = 100;
let _resultsPerPageDefault = 10;

export default {
  get resultsPerPageMax() {
    return _resultsPerPageMax;
  },
  set resultsPerPageMax(resMax) {
    if(isNaN(resMax)) {
      log.error('resultsPerPageMax require only integer');
      throw new TypeError('resultsPerPageMax require only integer');
    }

    _resultsPerPageMax = resMax;

    return this;
  },
  get resultsPerPageDefault() {
    return _resultsPerPageDefault;
  },
  set resultsPerPageDefault(resDefault) {
    if(isNaN(resDefault)) {
      log.error('resultsPerPageDefault require only integer');
      throw new TypeError('resultsPerPageDefault require only integer');
    }

    _resultsPerPageDefault = resDefault;

    return this;
  }
};