
const {
  CoinSlot
} = require('./coinSlot');

const productPrices = {
  Cola: 100,
  Chips: 50,
  Candy: 65
};

// Machine Statuses
const COLLECTING_COINS = 'COLLECTING COINS';
const NO_COINS_INSERTED = 'NO COINS INSERTED';
const BOUGHT_PRODUCT = 'BOUGHT PRODUCT';
const PRODUCT_SELECTED = 'PRODUCT SELECTED';
const INSUFFICIENT_FUNDS = 'INSUFFICIENT FUNDS';

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
    this.machineStatus = NO_COINS_INSERTED;
    this.displayChecks = 0;
    // product selected creation
    this.productSelected = '';
  }

  insertCoin (diameter, thickness, weight) {
    const collectedMoney = this.coinSlot.insertCoin(diameter, thickness, weight);
    this.machineStatus = COLLECTING_COINS;
    this.display = this.coinSlot.formatCurrency(collectedMoney);
  }

  selectProduct (item) {
    this.productSelected = item;
    this.machineStatus = PRODUCT_SELECTED;
    return this.productSelected;
  }

  buyProduct (item) {
    this.productSelected = item;
    if (this.productInventory.get(item) > 0) {
      if (this.coinSlot.checkCollectedMoney() >= productPrices[item]) {
        const newItemCount = this.productInventory.get('item') - 1;
        this.productInventory.set('item', newItemCount);
        this.coinSlot.dispenseChange(productPrices[item]);
        this.machineStatus = BOUGHT_PRODUCT;
        return `1 ${item}`;
      } else {
        this.machineStatus = INSUFFICIENT_FUNDS;
        return this.checkDisplay();
      }
    } else {
      // //TODO;
    }
  }

  machineStatusIs (ms) {
    return this.machineStatus === ms;
  }

  checkDisplay () {
    // resuable values in this function
    const emptyChecks = this.displayChecks === 0;
    const beenChecked = this.displayChecks > 0;
    const moneyCollected = this.coinSlot.formatCurrency(this.coinSlot.checkCollectedMoney());
    const rawMoneyColleted = this.coinSlot.checkCollectedMoney();
    const curProductPrice = this.coinSlot.formatCurrency(productPrices[this.productSelected]);

    // reset display function
    const resetDisplay = () => {
      if (rawMoneyColleted !== 0) {
        this.machineStatus = COLLECTING_COINS;
      } else {
        this.machineStatus = NO_COINS_INSERTED;
      }
      this.displayChecks = 0;
      this.productSelected = '';
    };

    // no inserted coins
    if (this.machineStatus === NO_COINS_INSERTED) {
      this.display = 'INSERT COIN';
    }

    // bought product messages
    if (this.machineStatus === BOUGHT_PRODUCT && emptyChecks) {
      this.display = 'THANK YOU';
      this.displayChecks++;
    } else if (this.machineStatus === BOUGHT_PRODUCT && beenChecked) {
      resetDisplay();
      return this.checkDisplay();
    }

    if (this.machineStatus === PRODUCT_SELECTED && emptyChecks) {
      let itemPrice = productPrices[this.productSelected];
      itemPrice = this.coinSlot.formatCurrency(itemPrice);
      this.display = `PRICE ${itemPrice}`;
      this.productSelected = '';
      this.displayChecks++;
    } else if (this.machineStatus === PRODUCT_SELECTED && beenChecked) {
      resetDisplay();
      return this.checkDisplay();
    }

    if (this.machineStatus === COLLECTING_COINS && emptyChecks) {
      this.display = moneyCollected;
      this.displayChecks++;
    } else if (this.machineStatus === COLLECTING_COINS && beenChecked) {
      resetDisplay();
      return this.checkDisplay();
    }
    if (this.machineStatus === INSUFFICIENT_FUNDS && emptyChecks) {
      this.display = `PRICE ${curProductPrice}`;
      this.displayChecks++;
    } else if (this.machineStatus === INSUFFICIENT_FUNDS && beenChecked) {
      resetDisplay();
      return this.checkDisplay();
    }

    return this.display;
  }
}
module.exports = {
  VendingMachine
};
