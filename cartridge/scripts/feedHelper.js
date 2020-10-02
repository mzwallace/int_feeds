'use strict';

var System               = require('dw/system/System');
var ProductSearchModel   = require('dw/catalog/ProductSearchModel');
var CatalogMgr           = require('dw/catalog/CatalogMgr');
// var ProductMgr           = require('dw/catalog/ProductMgr');

var RetargetingDecorator = require('~/cartridge/scripts/decorators/retargeting');
var ShoppingDecorator    = require('~/cartridge/scripts/decorators/shopping');
var AffiliatesDecorator  = require('~/cartridge/scripts/decorators/affiliates');
var SeoDecorator         = require('~/cartridge/scripts/decorators/seo');
var PricingDecorator     = require('~/cartridge/scripts/decorators/pricing');

var JsonFormat  = require('~/cartridge/scripts/formats/json');
var CsvFormat  = require('~/cartridge/scripts/formats/csv');
var XmlFormat  = require('~/cartridge/scripts/formats/xml');

var feeds = {
  all:         {
    decorator: RetargetingDecorator,
    category: 'shop'
  },
  shopping: {
    decorator: ShoppingDecorator,
    category: 'shopping'
  },
  retargeting: {
    decorator: RetargetingDecorator,
    category: 'retargeting'
  },
  affiliates:  {
    decorator: AffiliatesDecorator,
    category: 'affiliates'
  },
  seo:  {
    decorator: SeoDecorator,
    category: 'shop',
    options: {
      withSeoFields: true
    }
  },
  pricing:  {
    stagingOnly: true,
    decorator: PricingDecorator,
    category: 'shop',
    options: {
      priceBooks: [
        'usd-msrp',
        'aud-australia-list-prices',
        'gbp-united-kingdom-list-prices',
        'mxn-mexico-list-prices',
        'cny-china-list-prices',
        'jpy-japan-list-prices'
      ],
      columns: {
        'id': 'id',
        'Title': 'title',
        'Style Number': 'styleNumber',
        'United States (USD)': 'usd-msrp',
        'Australia (AUD)': 'aud-australia-list-prices',
        'United Kingdom (GBP)': 'gbp-united-kingdom-list-prices',
        'Mexico (MXN)': 'mxn-mexico-list-prices',
        'China (CNY)': 'cny-china-list-prices',
        'Japan (JPY)': 'jpy-japan-list-prices'
      }
    }
  }
};

var formats = {
  json: JsonFormat,
  csv: CsvFormat,
  xml: XmlFormat
};

var getFeedNames = function() {
  return Object.keys(feeds);
};

var getFeedData = function(name) {
  return feeds[name];
};

var isValidFeed = function(name) {
  return getFeedNames().indexOf(name) !== -1;
};

var getFormatNames = function() {
  return Object.keys(formats);
};

var getFormat = function(format) {
  return formats[format];
};

var isValidFormat = function(format) {
  return getFormatNames().indexOf(format) !== -1;
};

var isValidEnv = function(filter) {
  var feed = getFeedData(filter);

  if (!feed) return false;

  return feed.stagingOnly ? System.getInstanceType() === System.STAGING_SYSTEM : true;
};

var getOutput = function(name, format) {
  if (!name || !isValidFeed(name)) name = 'all';
  if (!format || !isValidFormat(format)) format = 'xml';

  var feed = getFeedData(name);
  var products = [];

  if (['all', 'pricing'].indexOf(name !== -1)) {
    // this method returns all products regardless of online / offline / searchable or orderable status
    var category = CatalogMgr.getCategory(feed.category);
    products = category.getProducts().toArray();

    // can't use this method on the storefront apparently
    // var products = ProductMgr.queryAllSiteProducts();
  } else {
    // this method only returns searchable products ?
    var query = new ProductSearchModel();
    query.setCategoryID(feed.category);
    query.setOrderableProductsOnly(false);
    query.setRecursiveCategorySearch(false);
    query.search();
    products = query.getProducts().asList().toArray();
  }

  products = products.filter(function(product) {
    // removing master products and offline products from feed
    return !product.master && product.online;
  }).map(function(product) {
    return feed.decorator.decorate(product, feed.options);
  });

  return getFormat(format).format(products, feed.options);
};

exports.isValidEnv     = isValidEnv;

exports.isValidFeed    = isValidFeed;
exports.getFeedNames   = getFeedNames;
exports.getFeedData    = getFeedData;

exports.isValidFormat  = isValidFormat;
exports.getFormatNames = getFormatNames;
exports.getFormat      = getFormat;

exports.getOutput      = getOutput;
