/**
 * calcPagination
 *
 * @module calcPagination
 *
 * @author Luca Pau <luca.pau82@gmail.com>
 */

import config from '../config';

export default function calcPagination(currentPage, totalItems, itemsPerPage) {
  itemsPerPage = parseInt(itemsPerPage);
  currentPage = parseInt(currentPage);
  //totalItems = parseInt(totalItems);

  //if(isNaN(totalItems))
  //  throw new TypeError('totalItems must be a valid number');

  if (isNaN(itemsPerPage)) {
    itemsPerPage = config.resultsPerPageDefault;
  } else if (itemsPerPage > config.resultsPerPageMax) {
    itemsPerPage = config.resultsPerPageMax;
  }
  if (isNaN(currentPage) || currentPage < 1) {
    currentPage = 1;
  }
  var limit = itemsPerPage;
  var skip = 0;
  var totalPages = 0;
  if (totalItems > 0) {
    totalPages = (
      totalItems % itemsPerPage === 0 ?
      totalItems / itemsPerPage :
      parseInt(totalItems / itemsPerPage) + 1
    );

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    skip = (currentPage - 1) * limit;
  }

  return {
    skip: skip,
    limit: limit,
    totalPages: totalPages,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    totalItems: totalItems
  };
}