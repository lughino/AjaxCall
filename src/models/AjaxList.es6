/**
 * AjaxList class
 *
 * @module AjaxList
 *
 * @author Luca Pau <luca.pau82@gmail.com>
 */

import AjaxCall from './AjaxCall';

let _items = Symbol();
let _uniqueItems = Symbol();

class AjaxList extends AjaxCall {
  constructor() {
    super();
    this.items = [];
    this[_uniqueItems] = new Set();
  }

  get items() {
    return this[_items];
  }

  set items(items) {
    if(!Array.isArray(items))
      throw new TypeError('Items must be array!');

    this[_items] = items;

    return this;
  }

  addItem(item) {
    this.items.push(item);
    return this;
  }

  get uniqueItems() {
    return this[_uniqueItems];
  }

  set uniqueItems(uniqueItems) {
    if(Array.isArray(uniqueItems))
      this[_uniqueItems] = new Set(uniqueItems);
    else {
      this.uniqueItems.clear();
      this.uniqueItems.add(uniqueItems);
    }

    return this;
  }

  addUniqueItem(uniqueItem) {
    this.uniqueItems.add(uniqueItem);
    return this;
  }

  concatItems(...items) {
    for(let item of items) {
      this[_items] = this[_items].concat(item);
    }
    return this;
  }

  getStruct() {
    var superStruct = super.getStruct();
    superStruct.items = this.items;

    if(this.uniqueItems.size > 0)
      superStruct.uniqueItems = [...this.uniqueItems];

    return superStruct;
  }
}

export default AjaxList;