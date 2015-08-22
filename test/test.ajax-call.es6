import sinon from 'sinon';
import AjaxCallClass from '../src/models/AjaxCall';
import assert from 'assert';

describe('ajax-call: AjaxCall', () => {
  it('Constructor', (done) => {
    let AjaxCall = new AjaxCallClass();
    AjaxCall.should.containEql({});
    done();
  });

  it('Setter (result)', (done) => {
    let AjaxCall = new AjaxCallClass();
    AjaxCall.result = 10;
    AjaxCall.should.have.property('result', 10);
    done();
  });

  it('Setter (message)', (done) => {
    let AjaxCall = new AjaxCallClass();
    AjaxCall.message = 'test message';
    AjaxCall.should.have.property('message', 'test message');
    done();
  });

  it('Setter (value)', (done) => {
    let AjaxCall = new AjaxCallClass();
    AjaxCall.value = {'test': 10};
    AjaxCall.should.have.property('value', {'test': 10});
    done();
  });

  it('Setter (all)', (done) => {
    let AjaxCall = new AjaxCallClass();
    AjaxCall.result = 1;
    AjaxCall.message = 'msg';
    AjaxCall.value = {'_id': 1};
    AjaxCall.should.have.property('result', 1);
    AjaxCall.should.have.property('message', 'msg');
    AjaxCall.should.have.property('value', {'_id': 1});
    done();
  });

  it('get struct', (done) => {
    let AjaxCall = new AjaxCallClass();
    let struct = AjaxCall.getStruct();

    assert.deepEqual(struct, {
      code: 0,
      success: true,
      result: 0,
      message: '',
      value: {}
    });
    done();
  });

  it('isEmptyObject static method', (done) => {
    (AjaxCallClass._isEmptyObj({})).should.be.equal(true);
    (AjaxCallClass._isEmptyObj({a:1, b:2})).should.be.equal(false);
    done();
  });

  it('isEmptyObject static method, called with instance', (done) => {
    let AjaxCall = new AjaxCallClass();

    (AjaxCall.constructor._isEmptyObj({})).should.be.equal(true);
    (AjaxCall.constructor._isEmptyObj({a:1, b:2})).should.be.equal(false);
    done();
  });

  it('Send empty message', (done) => {
    let res = {
      json: sinon.stub()
    };
    let AjaxCall = new AjaxCallClass();

    AjaxCall.send(res);

    sinon.assert.calledWith(res.json, sinon.match({
      code: 0,
      success: true,
      result: 0,
      message: '',
      value: {}
    }));
    done();
  });

  it('Send message', (done) => {
    let res = {
      json: sinon.stub()
    };
    let AjaxCall = new AjaxCallClass();

    AjaxCall.result = 1;
    AjaxCall.message = 'msg';
    AjaxCall.value = {'_id': 1};
    AjaxCall.send(res);

    sinon.assert.calledWith(res.json, sinon.match({
      result: 1,
      message: 'msg',
      value: {'_id': 1}
    }));
    done();
  });

  it('Send error message', (done) => {
    let res = {
      status: (value) => value.should.be.equal(1)
    };

    let AjaxCall = new AjaxCallClass();

    sinon.stub(AjaxCall, 'send');
    AjaxCall.sendErrorMessage(res, 1, 'msg');
    AjaxCall.should.have.property('result', 1);
    AjaxCall.should.have.property('message', 'msg');
    AjaxCall.should.have.property('value', {});

    sinon.assert.calledWith(AjaxCall.send, sinon.match({}));
    done();
  });

  it('Send sendUncaughtExceptionMessage', (done) => {
    let res = {
      status: (value) => value.should.be.equal(500),
      req: sinon.stub()
    };
    let err = {
      stack: sinon.stub()
    };

    let AjaxCall = new AjaxCallClass();

    sinon.stub(AjaxCall, 'send');
    AjaxCall.sendUncaughtExceptionMessage(res, err);
    AjaxCall.should.have.property('result', 500);
    AjaxCall.should.have.property('message', 'UncaughtException');
    AjaxCall.should.have.property('value', {});

    sinon.assert.calledWith(AjaxCall.send, sinon.match({}));
    done();
  });

  it('Send UnhandledExceptionMessage', (done) => {
    let res = {
      status: (value) => value.should.be.equal(501),
      req: sinon.stub()
    };
    let err = {
      stack: sinon.stub()
    };

    let AjaxCall = new AjaxCallClass();

    sinon.stub(AjaxCall, 'send');
    AjaxCall.sendUnhandledExceptionMessage(res, err);
    AjaxCall.should.have.property('result', 501);
    AjaxCall.should.have.property('message', 'UnhandledException');
    AjaxCall.should.have.property('value', {});

    sinon.assert.calledWith(AjaxCall.send, sinon.match({}));
    done();
  });

  it('Send value', (done) => {
    let res = {
      status: (status) => status.should.be.equal(200)
    };

    let AjaxCall = new AjaxCallClass();

    sinon.stub(AjaxCall, 'send');
    AjaxCall.sendValue(res, {'_id': 1});
    AjaxCall.should.have.property('result', 0);
    AjaxCall.should.have.property('message', '');
    AjaxCall.should.have.property('value', {'_id': 1});

    sinon.assert.calledWith(AjaxCall.send, sinon.match({}));
    done();
  });

  it('Send value with optional parameter statusCode', (done) => {
    let res = {
      status: (stat) => stat.should.be.equal(250)
    };

    let AjaxCall = new AjaxCallClass();

    sinon.stub(AjaxCall, 'send');
    AjaxCall.sendValue(res, {'_id': 1}, 250);
    AjaxCall.should.have.property('result', 0);
    AjaxCall.should.have.property('message', '');
    AjaxCall.should.have.property('value', {'_id': 1});

    sinon.assert.calledWith(AjaxCall.send, sinon.match({}));
    done();
  });

  it('Send value with empty value', (done) => {
    let res = {
      status: (status) => status.should.be.equal(204)
    };

    let AjaxCall = new AjaxCallClass();

    sinon.stub(AjaxCall, 'send');
    AjaxCall.sendValue(res, {});
    AjaxCall.should.have.property('result', 0);
    AjaxCall.should.have.property('message', '');
    AjaxCall.should.have.property('value', {});

    sinon.assert.calledWith(AjaxCall.send, sinon.match({}));
    done();
  });
});
