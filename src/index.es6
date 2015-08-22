/**
 * AjaxCall
 *
 * A simple module for create a format between server and client
 *
 * @module AjaxCall
 *
 * @author Luca Pau <luca.pau82@gmail.com>
 */

import * as models from './models';

let AjaxCallFactory = () => new models.AjaxCall();
let AjaxListFactory = () => new models.AjaxList();
let AjaxFormCallFactory = () => new models.AjaxFormCall();
let AjaxDataGridFactory = (totalItems, currentPage, totalPages, itemsPerPage) =>
  new models.AjaxDataGrid(totalItems, currentPage, totalPages, itemsPerPage);

export {setLogger} from './log';
export {default as config} from './config';
export {default as paginatorMiddleware} from './middleware/paginator'
export {default as calcPagination} from './helpers/calcPagination'

export {
  models,
  AjaxCallFactory,
  AjaxListFactory,
  AjaxFormCallFactory,
  AjaxDataGridFactory
}