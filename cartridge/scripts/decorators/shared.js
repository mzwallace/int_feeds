'use strict';

var URLUtils = require('dw/web/URLUtils');
var basePriceHelper = require('~/cartridge/scripts/helpers/basePrice');
var stripHtmlHelper = require('~/cartridge/scripts/helpers/stripHtml');
var convertListHelper = require('~/cartridge/scripts/helpers/convertList');

// INFO: relies on DIS for images
var ProductImage = require('app_disbestpractice/cartridge/scripts/product/ProductImageSO');

exports.decorate = function(product, options) {
  options = options || {};

  var result = {};
  result.id = product.ID;

  // title
  result.title = product.name;

  // override the title if we have collection and shape
  if (product.custom.collection && product.custom.shape) {
    result.title = product.custom.collection + ' ' + product.custom.shape;
  }

  // add brand to title if the option is passed
  if (options.addBrandToTitle && [null, '', 'Brand Name'].indexOf(product.getManufacturerName()) !== -1) {
    result.title = 'Brand Name ' + result.title;
  }

  // utlize custom feed overrides for en_US
  if (request.locale === 'en_US' && !empty(product.custom.feedTitle)) {
    result.title = product.custom.feedTitle;
  }

  // description
  result.description = '';

  if (product.getShortDescription()) {
    result.description += stripHtmlHelper(product.getShortDescription().getMarkup());
  }

  if (product.getLongDescription()) {
    if (!empty(result.description)) {
      result.description += '\r\n\r\n ';
    }

    result.description += convertListHelper(product.getLongDescription().getMarkup());
  }

  // utlize custom feed overrides for en_US
  if (request.locale === 'en_US' && !empty(product.custom.feedDescription)) {
    result.description = product.custom.feedDescription;
  }

  result.MPN = product.manufacturerSKU;
  result.UPC = !empty(product.UPC) ? product.UPC : '';
  result.GTIN = !empty(product.UPC) ? product.UPC : product.manufacturerSKU;

  result.link = URLUtils.http('Product-Show', 'pid', product.ID).toString();
  result.mobileLink = result.link;

  result.image = new ProductImage('large', product, 0).getAbsURL().toString();

  var basePrice = basePriceHelper(product.priceModel);
  result.price = basePrice.toNumberString() + ' ' + basePrice.currencyCode;
  result.salePrice = product.priceModel.price.toNumberString() + ' ' + product.priceModel.price.currencyCode;

  // TODO: change business logic for free shipping
  result.shippingFee = product.priceModel.price < 150 ? '8.00 USD' : '0.00 USD';

  result.availability = product.getAvailabilityModel().isInStock() ? 'in stock' : 'out of stock';

  result.gender = !empty(product.custom.feedGender.value) ? product.custom.feedGender.value : 'female';
  result.color = !empty(product.custom.refinementColor.value) ? product.custom.refinementColor.value : '';
  result.ageGroup = 'adult';
  result.condition = 'new';
  result.brand = product.getManufacturerName() || 'Brand Name';

  // TODO: change default
  result.googleProductCategory = !empty(product.custom.feedGoogleProductCategory.value) ? product.custom.feedGoogleProductCategory.value : 'Apparel & Accessories > Handbags, Wallets & Cases';

  result.productType  = !empty(product.custom.feedProductType) ? product.custom.feedProductType : '';
  result.customLabel0 = !empty(product.custom.feedCustomLabel0) ? product.custom.feedCustomLabel0 : '';
  result.customLabel1 = !empty(product.custom.feedCustomLabel1) ? product.custom.feedCustomLabel1 : '';
  result.customLabel2 = !empty(product.custom.feedCustomLabel2) ? product.custom.feedCustomLabel2 : '';
  result.customLabel3 = !empty(product.custom.feedCustomLabel3) ? product.custom.feedCustomLabel3 : '';
  result.customLabel4 = !empty(product.custom.feedCustomLabel4) ? product.custom.feedCustomLabel4 : '';

  return result;
};
