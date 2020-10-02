exports.format = function(results) {
  let output =
    <rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
      <channel>
        <title>Product Feed</title>
        <description>Google Shopping Compliant Product Feed</description>
      </channel>
    </rss>;

  var ns = new Namespace('g','http://base.google.com/ns/1.0');

  for each(var result in results) {
    var item : XML = <item></item>;

    item.id = result.id;
    item.id.setNamespace(ns);

    item.MPN = result.MPN;
    item.MPN.setNamespace(ns);

    item.UPC = result.UPC
    item.UPC.setNamespace(ns);

    item.GTIN = result.GTIN;
    item.GTIN.setNamespace(ns);

    item.title = result.title;
    item.title.setNamespace(ns);

    item.description = result.description;
    item.description.setNamespace(ns);

    item.price = result.price;
    item.price.setNamespace(ns);

    item.sale_price = result.salePrice;
    item.sale_price.setNamespace(ns);

    item.availability = result.availability;
    item.availability.setNamespace(ns);

    item.condition = result.condition;
    item.condition.setNamespace(ns);

    item.brand = result.brand;
    item.brand.setNamespace(ns);

    item.link = result.link;
    item.mobile_link = result.mobileLink;

    item.image_link = result.image;
    item.image_link.setNamespace(ns);

    item.google_product_category = result.googleProductCategory;
    item.google_product_category.setNamespace(ns);

    item.gender = result.gender;
    item.gender.setNamespace(ns);

    item.color = result.color;
    item.color.setNamespace(ns);

    item.age_group = result.ageGroup;
    item.age_group.setNamespace(ns);

    item.product_type = result.productType;
    item.product_type.setNamespace(ns);

    item.custom_label_0 = result.customLabel0;
    item.custom_label_0.setNamespace(ns);
    item.custom_label_1 = result.customLabel1;
    item.custom_label_1.setNamespace(ns);
    item.custom_label_2 = result.customLabel2;
    item.custom_label_2.setNamespace(ns);
    item.custom_label_3 = result.customLabel3;
    item.custom_label_3.setNamespace(ns);
    item.custom_label_4 = result.customLabel4;
    item.custom_label_4.setNamespace(ns);

    // INFO: if taxes are simple, you can add them here
    // item.tax +=
    //   <tax>
    //     <country>US</country>
    //     <region>NJ</region>
    //     <rate>6.625</rate>
    //   </tax>;
    // item.tax.country.setNamespace(ns);
    // item.tax.region.setNamespace(ns);
    // item.tax.rate.setNamespace(ns);
    // item.tax.setNamespace(ns);
    //
    // item.tax +=
    //   <tax>
    //     <country>US</country>
    //     <region>NY</region>
    //     <rate>8.875</rate>
    //   </tax>;
    // item.tax.country.setNamespace(ns);
    // item.tax.region.setNamespace(ns);
    // item.tax.rate.setNamespace(ns);
    // item.tax.setNamespace(ns);

    item.shipping +=
      <shipping>
        <country>US</country>
        <region>*</region>
        <service>Ground</service>
      </shipping>;
    item.shipping.price = result.shippingFee;
    item.shipping.country.setNamespace(ns);
    item.shipping.region.setNamespace(ns);
    item.shipping.service.setNamespace(ns);
    item.shipping.price.setNamespace(ns);
    item.shipping.setNamespace(ns);

    output.channel.item += item
  }

  return output;
};
