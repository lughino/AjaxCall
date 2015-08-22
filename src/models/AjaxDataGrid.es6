/**
 * AjaxDataGrid class
 *
 * @module AjaxDataGrid
 *
 * @author Luca Pau <luca.pau82@gmail.com>
 */

import AjaxList from './AjaxList';
import config from '../config';

let _totalItems = Symbol();
let _currentPage = Symbol();
let _totalPages = Symbol();
let _itemsPerPage = Symbol();

/**
 * AjaxDataGrid class
 *
 * Perform ajax call for pagination
 *
 * @class AjaxDataGrid
 * @extends AjaxList
 */
class AjaxDataGrid extends AjaxList {
  /**
   * @constructor
   *
   * @param {int} [totalItems] total items
   * @param {int} [currentPage] current page
   * @param {int} [totalPages] total pages
   * @param {int} [itemsPerPage] number of items per page
   */
  constructor(totalItems=0, currentPage=1, totalPages=0,
              itemsPerPage=config.resultsPerPageDefault) {
    super();
    this.totalItems = totalItems;
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.itemsPerPage = itemsPerPage;
  }

  get totalItems() {
    return this[_totalItems];
  }

  set totalItems(totalItems) {
    if(typeof(totalItems) !== 'number')
      throw new TypeError('totalItems must be a number');

    this[_totalItems] = totalItems;
    return this;
  }

  get currentPage() {
    return this[_currentPage];
  }

  set currentPage(currentPage) {
    if(typeof(currentPage) !== 'number')
      throw new TypeError('currentPage must be a number');

    this[_currentPage] = currentPage;
    return this;
  }

  get totalPages() {
    return this[_totalPages];
  }

  set totalPages(totalPages) {
    if(typeof(totalPages) !== 'number')
      throw new TypeError('totalPages must be a number');

    this[_totalPages] = totalPages;
    return this;
  }

  get itemsPerPage() {
    return this[_itemsPerPage];
  }

  set itemsPerPage(itemsPerPage) {
    if(typeof(itemsPerPage) !== 'number')
      throw new TypeError('itemsPerPage must be a number');

    this[_itemsPerPage] = itemsPerPage;
    return this;
  }

  reInit(totalItems=0, currentPage=1, totalPages=0,
         itemsPerPage=config.resultsPerPageDefault) {
    this.totalItems = totalItems;
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.itemsPerPage = itemsPerPage;

    return this;
  }

  getStruct() {
    var superStruct = super.getStruct();
    superStruct.totalItems = this.totalItems;
    superStruct.currentPage = this.currentPage;
    superStruct.totalPages = this.totalPages;
    superStruct.itemsPerPage = this.itemsPerPage;

    return superStruct;
  }
}

export default AjaxDataGrid;