import sinon from 'sinon';
import AjaxListClass from '../src/models/AjaxList';
import assert from 'assert';

describe('ajax-call: AjaxList', () => {
  it('Constructor', (done) => {
    let AjaxList = new AjaxListClass();
    AjaxList.should.containEql({});
    AjaxList.should.have.property('result', 0);
    AjaxList.should.have.property('message', '');
    AjaxList.should.have.property('value', {});
    AjaxList.should.have.property('items', []);
    done();
  });

  it('Add item', (done) => {
    let AjaxList = new AjaxListClass();
    AjaxList.addItem({a:1});
    AjaxList.should.have.property('result', 0);
    AjaxList.should.have.property('message', '');
    AjaxList.should.have.property('value', {});
    AjaxList.should.have.property('items', [{a:1}]);
    done();
  });

  it('Add more item', (done) => {
    let AjaxList = new AjaxListClass();
    AjaxList.addItem(1);
    AjaxList.addItem(2);
    AjaxList.addItem(4);
    AjaxList.addItem(3);
    AjaxList.addItem({a:1,b:2,c:3});
    AjaxList.should.have.property('result', 0);
    AjaxList.should.have.property('message', '');
    AjaxList.should.have.property('value', {});
    AjaxList.should.have.property('items', [1, 2, 4, 3, {a:1,b:2,c:3}]);
    done();
  });

  it('Set items with array', (done) => {
    let AjaxList = new AjaxListClass();
    AjaxList.items = [1, 3, 5, 10];
    AjaxList.should.have.property('result', 0);
    AjaxList.should.have.property('message', '');
    AjaxList.should.have.property('value', {});
    AjaxList.should.have.property('items', [1, 3, 5, 10]);

    AjaxList.addItem(500);
    AjaxList.should.have.property('items', [1, 3, 5, 10, 500]);
    done();
  });

  it('Set items with non array', (done) => {
    let AjaxList = new AjaxListClass();
    (() => AjaxList.items = 'string')
      .should.throw(TypeError, { message: 'Items must be array!' });
    done();
  });

  it('Concat items', (done) => {
    let AjaxList = new AjaxListClass();
    AjaxList.items = [1, 3, 5, 10];
    AjaxList.should.have.property('result', 0);
    AjaxList.should.have.property('message', '');
    AjaxList.should.have.property('value', {});
    AjaxList.should.have.property('items', [1, 3, 5, 10]);

    AjaxList.concatItems(100);
    AjaxList.should.have.property('items', [1, 3, 5, 10, 100]);

    AjaxList.concatItems(['a', 'b', 'c']);
    AjaxList.should.have.property('items', [1, 3, 5, 10, 100, 'a', 'b', 'c']);

    AjaxList.concatItems(111, [8, 7, 6]);
    AjaxList.should.have.property('items',
      [1, 3, 5, 10, 100, 'a', 'b', 'c', 111, 8, 7, 6]);
    done();
  });

  it('Add unique item', (done) => {
    let AjaxList = new AjaxListClass();
    AjaxList.addUniqueItem(1);
    AjaxList.addUniqueItem(2);
    AjaxList.addUniqueItem(4);
    AjaxList.addUniqueItem(3);
    AjaxList.addUniqueItem({a:1,b:2,c:3});
    AjaxList.should.have.property('result', 0);
    AjaxList.should.have.property('message', '');
    AjaxList.should.have.property('value', {});
    AjaxList.should.have.property('uniqueItems').instanceof(Set);
    [...AjaxList.uniqueItems].should.be.eql([1, 2, 4, 3, {a:1,b:2,c:3}]);

    AjaxList.addUniqueItem(2);
    AjaxList.addUniqueItem(4);
    AjaxList.addUniqueItem(3);
    AjaxList.should.have.property('uniqueItems').instanceof(Set);
    [...AjaxList.uniqueItems].should.be.eql([1, 2, 4, 3, {a:1,b:2,c:3}]);
    done();
  });

  describe('Set unique items', () => {
    let AjaxList;
    before(() => {
      AjaxList = new AjaxListClass();
      AjaxList.should.have.property('result', 0);
      AjaxList.should.have.property('message', '');
      AjaxList.should.have.property('value', {});
      AjaxList.should.have.property('items', []);
    });

    it('set unique items with array value', (done) => {
      AjaxList.uniqueItems = [1, 2, 555, {a:1,b:2,c:3}];
      AjaxList.should.have.property('uniqueItems').instanceof(Set);
      [...AjaxList.uniqueItems].should.be.eql([1, 2, 555, {a:1,b:2,c:3}]);

      AjaxList.uniqueItems = [1, 3, 5, 10, 100, 'a', 'b', 'c', 111, 8, 7, 6];
      AjaxList.should.have.property('uniqueItems').instanceof(Set);
      [...AjaxList.uniqueItems].should.be.eql(
        [1, 3, 5, 10, 100, 'a', 'b', 'c', 111, 8, 7, 6]);

      done();
    });
    it('set unique items without array value', (done) => {
      AjaxList.uniqueItems = {a:1,b:2,c:3};
      AjaxList.should.have.property('uniqueItems').instanceof(Set);
      [...AjaxList.uniqueItems].should.be.eql([{a:1,b:2,c:3}]);

      AjaxList.uniqueItems = 'string';
      AjaxList.should.have.property('uniqueItems').instanceof(Set);
      [...AjaxList.uniqueItems].should.be.eql(['string']);

      done();
    });
  });

  it('get struct empty', (done) => {
    let AjaxList = new AjaxListClass();
    let struct = AjaxList.getStruct();

    assert.deepEqual(struct, {
      code: 0,
      success: true,
      result: 0,
      message: '',
      value: {},
      items: []
    });

    done();
  });

  it('get struct not empty', (done) => {
    let AjaxList = new AjaxListClass();
    AjaxList.addItem(1);
    AjaxList.addItem(2);

    let struct = AjaxList.getStruct();

    assert.deepEqual(struct, {
      code: 0,
      success: true,
      result: 0,
      message: '',
      value: {},
      items: [1, 2]
    });
    done();
  });

  it('get struct not empty with uniqueItems', (done) => {
    let AjaxList = new AjaxListClass();
    AjaxList.addUniqueItem(1);
    AjaxList.addUniqueItem(2);

    let struct = AjaxList.getStruct();

    assert.deepEqual(struct, {
      code: 0,
      success: true,
      result: 0,
      message: '',
      value: {},
      items: [],
      uniqueItems: [1, 2]
    });
    done();
  });
});
