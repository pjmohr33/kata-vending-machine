
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

  selectProduct (item) {
    this.productSelected = item;
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
        this.productSelected = '';
        return `1 ${item}`;
      } else {
        return this.checkDisplay;
      }
    } else {
      return false;
    }
  }

  checkDisplay () {
    // no money in the vending machine
    if (this.machineStatus === 'NO COINS INSERTED' && this.productSelected === '') {
      this.display = 'INSERT COIN';
      return this.display;
    }
    // bought product messages
    if (this.machineStatus === 'BOUGHT PRODUCT' && this.displayChecks === 0) {
      this.display = 'THANK YOU';
      this.displayChecks++;
      return this.display;
    } else if (this.machineStatus === 'BOUGHT PRODUCT' && this.displayChecks > 0) {
      this.displayChecks = 0;
      this.machineStatus = 'NO COINS INSERTED';
      return this.checkDisplay();
    }
    if (this.productSelected !== '' && this.displayChecks === 0) {
      let itemPrice = productPrices[this.productSelected];
      itemPrice = this.coinSlot.formatCurrency(itemPrice);
      this.display = `PRICE ${itemPrice}`;
      this.productSelected = '';
      return this.display;
    }
  }
}
module.exports = {
  VendingMachine
};
