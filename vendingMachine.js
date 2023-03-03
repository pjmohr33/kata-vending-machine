
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
    if (item === 'Cola') {
      if (this.coinSlot.checkCollectedMoney() >= productPrices.Cola) {
        this.coinSlot.calculateChange(productPrices.Cola);
        return true;
      } else {
        return false;
      }
    } else if (item === 'Chips') {
      if (this.coinSlot.checkCollectedMoney() >= productPrices.Chips) {
        this.coinSlot.calculateChange(productPrices.Chips);
        return true;
      } else {
        return false;
      }
    } else if (item === 'Candy') {
      if (this.coinSlot.checkCollectedMoney() >= productPrices.Candy) {
        this.coinSlot.calculateChange(productPrices.Candy);
        return true;
      } else {
        return false;
      }
    }
  }
}

module.exports = {
  VendingMachine
};
