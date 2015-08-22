/**
 * AjaxCall class
 *
 * @module AjaxCall
 *
 * @author Luca Pau <luca.pau82@gmail.com>
 */

import log from '../log';

let _result = Symbol();
let _message = Symbol();
let _value = Symbol();

class AjaxCall {
  constructor() {
    this.result = 0;
    this.message = '';
    this.value = {};
  }

  static _isEmptyObj(obj) {
    return typeof(obj) === 'object' &&
      Object.getOwnPropertyNames(obj).length === 0;
  }

  static _stringifyError(err, filter, space='\n') {
    var plainObject = {};
    if(typeof(err) === 'object') {
      Object.getOwnPropertyNames(err).forEach(function(key) {
        plainObject[key] = err[key];
      });
    }
    return JSON.stringify(plainObject, filter, space);
  };

  get value() {
    return this[_value];
  }

  set result(resultValue) {
    this[_result] = resultValue;
    return this;
  }

  get result() {
    return this[_result];
  }

  get message() {
    return this[_message];
  }

  set value(value) {
    this[_value] = value;
    return this;
  }

  set message(messageValue) {
    this[_message] = messageValue;
    return this;
  }

  sendErrorMessage(res, resultError, messageError) {
    this.result = resultError;
    this.message = messageError;
    res.status(resultError);
    this.send(res);
  }

  sendUncaughtExceptionMessage(res, err) {
    log.fatal(
      `UncaughtException occurred on url:
      ${res.req.url} \n
      with method "${res.req.method}"
      This is the stack trace:\n
      ${err.stack || 'no stack trace found'}\n\n\n
      Original error: \n
      ${err}\n\n
      Original error string formatted:
      ${this.constructor._stringifyError(err)}`
    );
    this.sendErrorMessage(res, 500, 'UncaughtException');
  }

  sendUnhandledExceptionMessage(res, err) {
    log.error(
      `UncaughtException occurred on url:
      ${res.req.url} \n
      with method "${res.req.method}"
      This is the stack trace:\n
      ${err.stack || 'no stack trace found'}\n\n\n
      Original error: \n
      ${err}\n\n
      Original error string formatted:
      ${this.constructor._stringifyError(err)}`
    );
    this.sendErrorMessage(res, 501, 'UnhandledException');
  }

  send(res) {
    return res.json(this.getStruct());
  }

  sendValue(res, valueSent, statusCode=null) {
    this.value = valueSent;
    res.status(
      (statusCode) || (this.constructor._isEmptyObj(this.value) ? 204 : 200)
    );
    this.send(res);
  }

  getStruct() {
    var success = this.result === 0;

    return {
      code: this.result,
      success: success,
      result: this.result,
      message: this.message,
      value: this.value
    };
  }
}

export default AjaxCall;