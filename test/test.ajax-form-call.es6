import sinon from 'sinon';
import AjaxFormCallClass from '../src/models/AjaxFormCall';

describe('ajax-call: AjaxFormCall', () => {
  it('Constructor', function(done) {
    var AjaxFormCall = new AjaxFormCallClass();
    AjaxFormCall.should.containEql({});
    AjaxFormCall.should.have.property('result', 0);
    AjaxFormCall.should.have.property('message', '');
    AjaxFormCall.should.have.property('value', {});
    AjaxFormCall.should.have.property('errors', {});
    AjaxFormCall.should.have.property('countErrors', 0);
    done();
  });

  it('Add error', (done) => {
    var AjaxFormCall = new AjaxFormCallClass();
    AjaxFormCall.addError('nameError', 'err');
    AjaxFormCall.should.have.property('result', 400);
    AjaxFormCall.should.have.property('message', '');
    AjaxFormCall.should.have.property('value', {});
    AjaxFormCall.errors.should.eql({
      'nameError': ['err']
    });
    done();
  });

  it('Add more error', (done) => {
    var AjaxFormCall = new AjaxFormCallClass();
    AjaxFormCall.addError('nameError', 'err1');
    AjaxFormCall.addError('nameError', 'err2');
    AjaxFormCall.should.have.property('result', 400);
    AjaxFormCall.should.have.property('message', '');
    AjaxFormCall.should.have.property('value', {});
    AjaxFormCall.errors.should.eql({
      'nameError': ['err1', 'err2']
    });
    done();
  });

  it('Add more more error', (done) => {
    var AjaxFormCall = new AjaxFormCallClass();
    AjaxFormCall.addError('nameError', 'err1');
    AjaxFormCall.addError('nameError', 'err2');
    AjaxFormCall.addError('anotherNameError', 'err3');
    AjaxFormCall.should.have.property('result', 400);
    AjaxFormCall.should.have.property('message', '');
    AjaxFormCall.should.have.property('value', {});
    AjaxFormCall.errors.should.eql({
      'nameError': ['err1', 'err2'],
      'anotherNameError': ['err3']
    });
    done();
  });

  it('get struct empty', (done) => {
    var AjaxFormCall = new AjaxFormCallClass();
    var struct = AjaxFormCall.getStruct();

    struct.should.eql({
      code: 0,
      success: true,
      result: 0,
      message: '',
      value: {},
      errors: {},
      countErrors: 0
    });
    done();
  });

  it('get struct empty', (done) => {
    var AjaxFormCall = new AjaxFormCallClass();
    AjaxFormCall.addError('nameError', 'err1');
    AjaxFormCall.addError('nameError', 'err2');
    AjaxFormCall.addError('anotherNameError', 'err3');

    var struct = AjaxFormCall.getStruct();

    struct.should.eql({
      code: 1,
      success: false,
      result: 1,
      message: '',
      value: {},
      errors: {
        'nameError': ['err1', 'err2'],
        'anotherNameError': ['err3']
      },
      countErrors: 3
    });
    done();
  });

  it('has Error', (done) => {
    var AjaxFormCall = new AjaxFormCallClass();
    AjaxFormCall.hasError().should.equal(false);
    AjaxFormCall.addError('nameError', 'err');
    AjaxFormCall.hasError().should.equal(true);
    done();
  });
});
