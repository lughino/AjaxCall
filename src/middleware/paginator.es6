/**
 * paginator
 *
 * @module paginator
 *
 * @author Luca Pau <luca.pau82@gmail.com>
 */

import log from '../log';
import {AjaxCallFactory} from '../';

export default function paginatorMiddleware(req, res, next) {
  let AjaxCall = AjaxCallFactory();
  try {
    var fields = req.body;

    if (!(fields.filters !== null && typeof fields.filters === 'object')) {
      return AjaxCall.sendErrorMessage(res, 400,
        'Inconsistent data [filter not set]');
    }

    let orderBy = null;
    if (fields.orderBy) {
      log.info('Paginator order by not implemented');
    }
    let paginator = {
      filters: fields.filters,
      currentPage: fields.page,
      itemsPerPage: fields.itemsPerPage,
      orderBy: orderBy
    };

    if (req.ajaxCall == null) {
      req.ajaxCall = {};
    }
    req.ajaxCall.paginator = paginator;
  } catch (err) {
    return AjaxCall.sendUnhandledExceptionMessage(res, err);
  }
  next();
}