'use strict';

var SharedDecorator = require('~/cartridge/scripts/decorators/shared');

exports.decorate = function(product) {
  var result = SharedDecorator.decorate(product);
  result.pageTitle = product.pageTitle;
  result.pageDescription = product.pageDescription;
  result.pageKeywords = product.pageKeywords;
  result.pageURL = product.pageURL;
  return result;
};
