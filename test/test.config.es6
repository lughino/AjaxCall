import sinon from 'sinon';
import config from '../src/config';
import assert from 'assert';

describe('ajax-call: config', () => {
  it('Config default', (done) => {
    config.should.have.property('resultsPerPageMax');
    config.should.have.property('resultsPerPageDefault');

    done();
  });

  it('Config set with invalid type of value', (done) => {
    config.should.have.property('resultsPerPageMax');
    config.should.have.property('resultsPerPageDefault');

    (() => config.resultsPerPageMax = 'string').should.throw(TypeError,
      {message: 'resultsPerPageMax require only integer'});

    (() => config.resultsPerPageDefault = 'string').should.throw(TypeError,
      {message: 'resultsPerPageDefault require only integer'});

    done();
  });

  it('Config set with valid type of value', (done) => {
    config.should.have.property('resultsPerPageMax');
    config.should.have.property('resultsPerPageDefault');

    let originalResultPerPageDefault = config.resultsPerPageDefault;
    let originalResultPerPageMax = config.resultsPerPageMax;

    config.resultsPerPageDefault = 33;
    config.resultsPerPageMax = 888;

    config.resultsPerPageDefault.should.be.equal(33);
    config.resultsPerPageMax.should.be.equal(888);

    config.resultsPerPageDefault.should.be.not.equal(originalResultPerPageDefault);
    config.resultsPerPageMax.should.be.not.equal(originalResultPerPageMax);

    done();
  });
});
