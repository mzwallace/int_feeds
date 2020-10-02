exports.format = function(results, options) {
  options = options || {};

  var columns = options.columns || [
    'id',
    'title',
    'description',
    'MPN',
    'UPC',
    'GTIN',
    'link',
    'mobileLink',
    'image',
    'price',
    'salePrice',
    'shippingFee',
    'availability',
    'gender',
    'color',
    'ageGroup',
    'productType',
    'customLabel0',
    'customLabel1',
    'customLabel2',
    'customLabel3',
    'customLabel4',
    'googleProductCategory',
    'condition',
    'brand'
  ];

  if (options.withSeoFields) {
    columns = columns.concat([
      'pageTitle',
      'pageDescription',
      'pageKeywords',
      'pageURL'
    ]);
  }

  var output = '';
  output += '"' + (columns.length ? columns.join('","') : Object.keys(columns).join('","')) + '"\r\n';

  for each(var result in results) {
    var row = [];

    for each(var column in columns) {
      var value = result[column] || '';
      row.push(value.toString().replace(/"/g, '&quot;'));
    }

    output += '"' + row.join('","') + '"\r\n';
  }

  return output;
};
