/**
 * AjaxFormCall class
 *
 * @module AjaxFormCall
 *
 * @author Luca Pau <luca.pau82@gmail.com>
 */

import AjaxCall from './AjaxCall';

let _errors = Symbol();
let _countErrors = Symbol();

/**
 * AjaxFormCall class
 *
 * Perform ajax call for forms
 *
 * @class AjaxFormCall
 * @extends AjaxCall
 */
class AjaxFormCall extends AjaxCall {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.errors = {};
    this.countErrors = 0;
  }

  get errors() {
    return this[_errors];
  }

  set errors(errors) {
    this[_errors] = errors;
    return this;
  }

  get countErrors() {
    return this[_countErrors];
  }

  set countErrors(countErrors) {
    this[_countErrors] = countErrors;
    return this;
  }

  hasError() {
    return this.countErrors !== 0;
  }

  addError(name, error) {
    this.result = 400;
    this.countErrors++;

    if (!(name in this.errors)) {
      this.errors[name] = [];
    }

    this.errors[name].push(error);

    return this;
  }

  getStruct() {
    var superStruct = super.getStruct();
    superStruct.errors = this.errors;
    superStruct.countErrors = this.countErrors;

    return superStruct;
  }
}

export default AjaxFormCall;