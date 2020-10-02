'use strict';

/**
 * Controller used for product feeds.
 *
 * @module controllers/Feed
 */

var responseUtil = require('app_mz_controllers/cartridge/scripts/util/Response');
var guard = require('app_mz_controllers/cartridge/scripts/guard');
var feedHelper = require('~/cartridge/scripts/feedHelper');

function show() {
  var filter = request.httpParameterMap.filter.value;
  var format = request.httpParameterMap.format.value;

  if (empty(filter)) {
    throw Error('filter query parameter rquired');
  }

  if (empty(format)) {
    format = 'xml';
  }

  if (!feedHelper.isValidFeed(filter)) {
    throw Error('filter query parameter can only be retargeting, shopping, or affiliates');
  }

  if (!feedHelper.isValidEnv(filter)) {
    throw Error('feed only available on staging');
  }

  if (!feedHelper.isValidFormat(format)) {
    throw Error('format query parameter can only be csv, json, or xml');
  }

  responseUtil.render(feedHelper.getOutput(filter, format), format, {filename: 'export-' + filter + '.csv'});
}

/**
 * Export the publicly available controller methods
 */

/** Renders cached product feed.
 * @see module:controllers/Feed~show
 */
exports.Show = guard.ensure(['get'], show);
