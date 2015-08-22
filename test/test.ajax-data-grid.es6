import sinon from 'sinon';
import should from 'should';
import AjaxDataGridClass from '../src/models/AjaxDataGrid';
import config from '../src/config';

describe('ajax-call: AjaxDataGrid', () => {
  describe('Constructor', () => {
    it('without params', (done) => {
      var AjaxDataGrid = new AjaxDataGridClass();
      AjaxDataGrid.should.have.property('result', 0);
      AjaxDataGrid.should.have.property('message', '');
      AjaxDataGrid.should.have.property('value', {});
      AjaxDataGrid.should.have.property('totalItems', 0);
      AjaxDataGrid.should.have.property('currentPage', 1);
      AjaxDataGrid.should.have.property('itemsPerPage', config.resultsPerPageDefault);
      AjaxDataGrid.should.have.property('totalPages', 0);
      AjaxDataGrid.should.have.property('items', []);
      done();
    });

    it('with params', (done) => {
      var AjaxDataGrid = new AjaxDataGridClass(52, 1, 11, 5);
      AjaxDataGrid.should.have.property('result', 0);
      AjaxDataGrid.should.have.property('message', '');
      AjaxDataGrid.should.have.property('value', {});
      AjaxDataGrid.should.have.property('totalItems', 52);
      AjaxDataGrid.should.have.property('currentPage', 1);
      AjaxDataGrid.should.have.property('totalPages', 11);
      AjaxDataGrid.should.have.property('itemsPerPage', 5);
      AjaxDataGrid.should.have.property('items', []);
      done();
    });

    it('with params not valid', (done) => {
      (() => new AjaxDataGridClass('string', {}, [], true)).should.throw(TypeError);
      done();
    });
  });

  it('Set params not valid', (done) => {
    var AjaxDataGrid = new AjaxDataGridClass();

    (() => AjaxDataGrid.totalItems = 'string')
      .should.throw(TypeError, { message: 'totalItems must be a number' });
    (() => AjaxDataGrid.currentPage = 'string')
      .should.throw(TypeError, { message: 'currentPage must be a number' });
    (() => AjaxDataGrid.totalPages = 'string')
      .should.throw(TypeError, { message: 'totalPages must be a number' });
    (() => AjaxDataGrid.itemsPerPage = 'string')
      .should.throw(TypeError, { message: 'itemsPerPage must be a number' });
    done();
  });

  describe('ReInit', () => {
    var AjaxDataGrid;

    before(() => {
      AjaxDataGrid = new AjaxDataGridClass();
      AjaxDataGrid.should.have.property('result', 0);
      AjaxDataGrid.should.have.property('message', '');
      AjaxDataGrid.should.have.property('value', {});
      AjaxDataGrid.should.have.property('totalItems', 0);
      AjaxDataGrid.should.have.property('currentPage', 1);
      AjaxDataGrid.should.have.property('itemsPerPage', config.resultsPerPageDefault);
      AjaxDataGrid.should.have.property('totalPages', 0);
      AjaxDataGrid.should.have.property('items', []);
    });

    it('with custom params', (done) => {
      AjaxDataGrid.reInit(20, 2, 2, 8);

      AjaxDataGrid.should.have.property('totalItems', 20);
      AjaxDataGrid.should.have.property('currentPage', 2);
      AjaxDataGrid.should.have.property('itemsPerPage', 8);
      AjaxDataGrid.should.have.property('totalPages', 2);
      done();
    });

    it('with default params', (done) => {
      AjaxDataGrid.reInit();

      AjaxDataGrid.should.have.property('totalItems', 0);
      AjaxDataGrid.should.have.property('currentPage', 1);
      AjaxDataGrid.should.have.property('itemsPerPage', config.resultsPerPageDefault);
      AjaxDataGrid.should.have.property('totalPages', 0);
      done();
    });

    it('with params not valid', (done) => {
      (() => AjaxDataGrid.reInit([], 'string', {}, true)).should.throw(TypeError);
      done();
    });
  });

  it('get struct empty', (done) => {
    var AjaxDataGrid = new AjaxDataGridClass();
    var struct = AjaxDataGrid.getStruct();

    struct.should.eql({
        code: 0,
        success: true,
        result: 0,
        message: '',
        value: {},
        items: [],
        totalItems: 0,
        currentPage: 1,
        itemsPerPage: 10,
        totalPages: 0
      }
    );
    done();
  });

  it('get struct NOT empty', (done) => {
    var AjaxDataGrid = new AjaxDataGridClass(52, 1, 11, 5);
    var struct = AjaxDataGrid.getStruct();

    struct.should.eql({
        code: 0,
        success: true,
        result: 0,
        message: '',
        value: {},
        items: [],
        totalItems: 52,
        currentPage: 1,
        totalPages: 11,
        itemsPerPage: 5
      }
    );
    done();
  });
});
