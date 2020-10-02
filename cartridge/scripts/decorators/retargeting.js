'use strict';

var SharedDecorator = require('~/cartridge/scripts/decorators/shared');

exports.decorate = function(product) {
  return SharedDecorator.decorate(product);
};
