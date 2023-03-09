
const {
  CoinSlot
} = require('./coinSlot');

const productPrices = {
  Cola: 100,
  Chips: 50,
  Candy: 65
};

class VendingMachine {
  constructor () {
    this.coinSlot = new CoinSlot();
  }

  buyProduct (item) {
    if (this.coinSlot.checkCollectedMoney() >= productPrices[item]) {
      this.coinSlot.calculateChange(productPrices[item]);
      return true;
    } else {
      return false;
    }
  }
}
module.exports = {
  VendingMachine
};
