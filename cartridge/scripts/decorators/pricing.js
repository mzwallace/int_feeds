'use strict';

var basePriceHelper = require('~/cartridge/scripts/helpers/basePrice');
var Countries = require('app_mz_core/cartridge/scripts/util/Countries');
var Currency = require('dw/util/Currency');
var Transaction = require('dw/system/Transaction');
var PriceBookMgr = require('dw/catalog/PriceBookMgr');
// var LocaleHelper = require('app_mz_core/cartridge/scripts/util/LocaleHelper');

exports.decorate = function(product, options) {
  options = options || {};

  var result = {};
  result.id = product.ID;
  result.title = product.name;

  if (product.custom.collection && product.custom.shape) {
    result.title = product.custom.collection + ' ' + product.custom.shape;
  }

  result.styleNumber = product.manufacturerSKU;

  var originalCurrency = session.getCurrency();

  options.priceBooks.forEach(function(priceBookId) {
    var priceBook = PriceBookMgr.getPriceBook(priceBookId);
    PriceBookMgr.setApplicablePriceBooks(priceBook);

    var currencyCode = priceBook.getCurrencyCode();
    var currency = Currency.getCurrency(currencyCode);
    Transaction.begin();
    session.setCurrency(currency);
    Transaction.commit();
    result[priceBookId] = basePriceHelper(product.priceModel).toNumberString();
  });

  Transaction.begin();
  session.setCurrency(originalCurrency);
  Transaction.commit();

  return result;
};
