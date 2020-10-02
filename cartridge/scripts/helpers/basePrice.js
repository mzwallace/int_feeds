function basePrice(PriceModel) {
  var StandardPrice = dw.value.Money.NOT_AVAILABLE;

  if (!empty(PriceModel)) {
    if (!PriceModel.getPrice().available) {
      StandardPrice = dw.value.Money.NOT_AVAILABLE;
    } else {
      var priceBook = PriceModel.priceInfo.priceBook;

      while (priceBook.parentPriceBook) {
        priceBook = priceBook.parentPriceBook ? priceBook.parentPriceBook : priceBook;
      }

      StandardPrice = PriceModel.getPriceBookPrice(priceBook.ID);
    }
  }

  if (!StandardPrice.equals(dw.value.Money.NOT_AVAILABLE) && !session.getCurrency().getCurrencyCode().equals(StandardPrice.getCurrencyCode())) {
    StandardPrice = dw.value.Money.NOT_AVAILABLE;
  }

  return StandardPrice;
}

module.exports = basePrice;
