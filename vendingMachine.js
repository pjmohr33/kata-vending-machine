
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
    // product inventory
    this.productInventory = new Map();
    this.productInventory.set('Cola', 12);
    this.productInventory.set('Chips', 20);
    this.productInventory.set('Candy', 25);
    // create vending machine display
    this.display = 'INSERT COIN';
    // create standards for display checking
    this.machineStatus = 'NO COINS INSERTED';
    this.displayChecks = 0;
    // product selected creation
    this.productSelected = '';
  }

  insertCoin (diameter, thickness, weight) {
    const collectedMoney = this.coinSlot.insertCoin(diameter, thickness, weight);
    this.machineStatus = 'COLLECTING COINS';
    this.display = this.coinSlot.formatCurrency(collectedMoney);
  }

  selectProduct (item) {
    this.productSelected = item;
    this.machineStatus = 'PRODUCT SELECTED';
    return this.productSelected;
  }

  buyProduct (item) {
    this.productSelected = item;
    if (this.productInventory.get(item) > 0) {
      if (this.coinSlot.checkCollectedMoney() >= productPrices[item]) {
        const newItemCount = this.productInventory.get('item') - 1;
        this.productInventory.set('item', newItemCount);
        this.coinSlot.dispenseChange(productPrices[item]);
        this.machineStatus = 'BOUGHT PRODUCT';
        return `1 ${item}`;
      } else {
        return this.checkDisplay;
      }
    } else {
      return false;
    }
  }

  checkDisplay () {
    // reset display function
    const resetDisplay = () => {
      this.display = 'INSERT COIN';
      this.displayChecks = 0;
      this.machineStatus = 'NO COINS INSERTED';
      this.productSelected = '';
    };

    const emptyChecks = this.displayChecks === 0;

    // bought product messages
    if (this.machineStatus === 'BOUGHT PRODUCT' && emptyChecks) {
      this.display = 'THANK YOU';
      this.displayChecks++;
    } else if (this.machineStatus === 'BOUGHT PRODUCT' && this.displayChecks > 0) {
      resetDisplay();
      return this.checkDisplay();
    }

    if (this.machineStatus === 'PRODUCT SELECTED' && emptyChecks) {
      let itemPrice = productPrices[this.productSelected];
      itemPrice = this.coinSlot.formatCurrency(itemPrice);
      this.display = `PRICE ${itemPrice}`;
      this.productSelected = '';
      this.displayChecks++;
    } else if (this.machineStatus === 'PRODUCT SELECTED' && this.displayChecks > 0) {
      resetDisplay();
      return this.checkDisplay();
    }

    if (this.machineStatus === 'COLLECTING COINS' && emptyChecks) {
      const moneyCollected = this.coinSlot.checkCollectedMoney();
      this.display = this.coinSlot.formatCurrency(moneyCollected);
      this.displayChecks++;
    } else if (this.machineStatus === 'COLLECTING COINS' && this.displayChecks > 0) {
      resetDisplay();
      return this.checkDisplay();
    }

    return this.display;
  }
}
module.exports = {
  VendingMachine
};
