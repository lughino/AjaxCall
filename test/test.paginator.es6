import sinon from 'sinon';
import paginatorMiddleware from '../src/middleware/paginator';
import assert from 'assert';

describe('ajax-call: PaginatorMiddleware', () => {
  it('Send without filters', (done) => {
    let req = {
      body: sinon.stub()
    };
    let res = {
      status: (status) => status.should.be.equal(400),
      json: (struct) => {
        assert.deepEqual(struct, {
          code: 400,
          success: false,
          result: 400,
          message: 'Inconsistent data [filter not set]',
          value: {}
        });
      }
    };
    let next = sinon.stub();
    let spy = sinon.spy(paginatorMiddleware);

    paginatorMiddleware(req, res, next);

    spy.calledWith(req, res, next);

    done();
  });

  it('Send without body (unhandled exception)', (done) => {
    let req = {};
    let res = {
      req: {},
      status: (status) => status.should.be.equal(501),
      json: (struct) => {
        assert.deepEqual(struct, {
          code: 501,
          success: false,
          result: 501,
          message: 'UnhandledException',
          value: {}
        });
      }
    };
    let next = sinon.stub();
    let spy = sinon.spy(paginatorMiddleware);

    paginatorMiddleware(req, res, next);

    spy.calledWith(req, res, next);

    done();
  });

  it('Send with filters', (done) => {
    let req = {
      body: {
        orderBy: sinon.stub(),
        filters: {},
        page: sinon.stub(),
        itemsPerPage: sinon.stub()
      }
    };
    let res = { req: sinon.stub(), json: sinon.stub(), status: sinon.stub() };
    let next = sinon.spy();
    let spy = sinon.spy(paginatorMiddleware);

    paginatorMiddleware(req, res, next);

    spy.calledWith(req, res, next);
    req.should.have.property('ajaxCall');
    assert.deepEqual(req.ajaxCall, {
      paginator: {
        filters: req.body.filters,
        currentPage: req.body.page,
        orderBy: null,
        itemsPerPage: req.body.itemsPerPage
      }
    });

    (next.called).should.be.equal(true);

    done();
  });
});
