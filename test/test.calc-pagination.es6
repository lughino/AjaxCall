import sinon from 'sinon';
import calcPagination from '../src/helpers/calcPagination';
import config from '../src/config';
import assert from 'assert';

describe('ajax-call: CalcPagination', () => {
  it('Call function without params', (done) => {
    let spy = sinon.spy(calcPagination);
    let calc = calcPagination();

    spy.calledWith();
    assert.deepEqual(calc, {
      skip: 0,
      limit: config.resultsPerPageDefault,
      totalPages: 0,
      currentPage: 1,
      itemsPerPage: config.resultsPerPageDefault,
      totalItems: undefined
    });
    done();
  });

  it('Call function with param itemsPerPage not valid', (done) => {
    let spy = sinon.spy(calcPagination);
    let calc = calcPagination(1, 10, 'string');

    spy.calledWith(1, 10, 'string');
    assert.deepEqual(calc, {
      skip: 0,
      limit: config.resultsPerPageDefault,
      totalPages: 1,
      currentPage: 1,
      itemsPerPage: config.resultsPerPageDefault,
      totalItems: 10
    });
    done();
  });

  it('Call function with param itemsPerPage not valid (over max limit)', (done) => {
    let spy = sinon.spy(calcPagination);
    let calc = calcPagination(1, 10, 150);

    spy.calledWith(1, 10, 150);
    assert.deepEqual(calc, {
      skip: 0,
      limit: config.resultsPerPageMax,
      totalPages: 1,
      currentPage: 1,
      itemsPerPage: config.resultsPerPageMax,
      totalItems: 10
    });
    done();
  });

  it('Call function with param currentPage not valid', (done) => {
    let spy = sinon.spy(calcPagination);
    let calc = calcPagination(undefined, 10, 150);

    spy.calledWith(undefined, 10, 150);
    assert.deepEqual(calc, {
      skip: 0,
      limit: config.resultsPerPageMax,
      totalPages: 1,
      currentPage: 1,
      itemsPerPage: config.resultsPerPageMax,
      totalItems: 10
    });
    done();
  });

  it('Call function with param currentPage not valid (< 1)', (done) => {
    let spy = sinon.spy(calcPagination);
    let calc = calcPagination(0, 10, 80);

    spy.calledWith(0, 10, 80);
    assert.deepEqual(calc, {
      skip: 0,
      limit: 80,
      totalPages: 1,
      currentPage: 1,
      itemsPerPage: 80,
      totalItems: 10
    });
    done();
  });

  it('Call function with param totalItems not valid', (done) => {
    let spy = sinon.spy(calcPagination);
    var calc = calcPagination(2, 'invalid', 80);

    spy.calledWith(2, 'invalid', 80);
    assert.deepEqual(calc, {
      skip: 0,
      limit: 80,
      totalPages: 0,
      currentPage: 2,
      itemsPerPage: 80,
      totalItems: 'invalid'
    });
    done();
  });

  it('Call function with param totalItems valid (two pages)', (done) => {
    let spy = sinon.spy(calcPagination);
    var calc = calcPagination(2, 18, 10);

    spy.calledWith(2, 18, 10);
    assert.deepEqual(calc, {
      skip: 10,
      limit: 10,
      totalPages: 2,
      currentPage: 2,
      itemsPerPage: 10,
      totalItems: 18
    });
    done();
  });

  it('Call function with params valid (five pages)', (done) => {
    let spy = sinon.spy(calcPagination);
    var calc = calcPagination(2, 48, 10);

    spy.calledWith(2, 48, 10);
    assert.deepEqual(calc, {
      skip: 10,
      limit: 10,
      totalPages: 5,
      currentPage: 2,
      itemsPerPage: 10,
      totalItems: 48
    });
    done();
  });

  it('Call function with params valid with module branch (five pages)', (done) => {
    let spy = sinon.spy(calcPagination);
    var calc = calcPagination(9, 50, 10);

    spy.calledWith(9, 50, 10);
    assert.deepEqual(calc, {
      skip: 40,
      limit: 10,
      totalPages: 5,
      currentPage: 5,
      itemsPerPage: 10,
      totalItems: 50
    });
    done();
  });

  it('Call function with param currentPage > totalPages (five pages)', (done) => {
    let spy = sinon.spy(calcPagination);
    var calc = calcPagination(7, 48, 10);

    spy.calledWith(7, 48, 10);
    assert.deepEqual(calc, {
      skip: 40,
      limit: 10,
      totalPages: 5,
      currentPage: 5,
      itemsPerPage: 10,
      totalItems: 48
    });
    done();
  });
});
