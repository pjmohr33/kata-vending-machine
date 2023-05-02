
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
const INSUFFICIENT_FUNDS = 'INSUFFICIENT FUNDS';
const SOLD_OUT = 'SOLD OUT';
const EXACT_CHANGE_ONLY = 'EXACT CHANGE ONLY';
const INSERT_COIN = 'INSERT COIN';
const CANT_GIVE_CHANGE = 'CANNOT RETURN NEEDED CHANGE, INSERT EXACT CHANGE ONLY'

class VendingMachine {
  constructor() {
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

  enoughChange() {
    const quarters = this.coinSlot.coinInventory.get('Quarters');
    const dimes = this.coinSlot.coinInventory.get('Dimes');
    const nickels = this.coinSlot.coinInventory.get('Nickels');
    return (quarters > 2 && dimes > 1) || (quarters > 1 && dimes > 2 && nickels > 2) || (dimes > 5 && nickels > 1) || nickels > 10;
  }

  canGiveChange(change) {
    const quarters = this.coinSlot.coinInventory.get('Quarters');
    const dimes = this.coinSlot.coinInventory.get('Dimes');
    const nickels = this.coinSlot.coinInventory.get('Nickels');
    return change < (dimes * 10 + nickels * 5 + quarters * 25)
  }

  insertCoin(diameter, thickness, weight) {
    const collectedMoney = this.coinSlot.insertCoin(diameter, thickness, weight);
    this.machineStatus = COLLECTING_COINS;
    this.display = this.coinSlot.formatCurrency(collectedMoney);
  }

  buyProduct(item) {
    const collectedCash = this.coinSlot.checkCollectedMoney();
    const productPrice = productPrices[item];
    const productInventory = this.productInventory.get(item);
    const changeOwed = collectedCash - productPrice;

    if (productInventory > 0) {
      if (collectedCash >= productPrice) {
        if (this.canGiveChange(changeOwed)) {
          const newItemCount = this.productInventory.get('item') - 1;
          this.productInventory.set('item', newItemCount);
          this.coinSlot.dispenseChange(productPrices[item]);
          this.machineStatus = BOUGHT_PRODUCT;
          return this.checkDisplay();
        } else {
          this.machineStatus = CANT_GIVE_CHANGE;
          this.coinSlot.emptyBucket();
          return this.checkDisplay();
        }

      } else {
        this.machineStatus = INSUFFICIENT_FUNDS;
        this.productSelected = item;
        return this.checkDisplay();
      }
    } else {
      this.machineStatus = SOLD_OUT;
      this.displayChecks = 0;
      return this.checkDisplay();
    }
  }

  checkDisplay() {
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
      if (this.enoughChange()) {
        this.display = INSERT_COIN;
      } else {
        this.display = EXACT_CHANGE_ONLY;
      }
    }

    // bought product messages
    if (this.machineStatus === BOUGHT_PRODUCT && emptyChecks) {
      this.display = 'THANK YOU';
      this.displayChecks++;
    } else if (this.machineStatus === BOUGHT_PRODUCT && beenChecked) {
      resetDisplay();
      return this.checkDisplay();
    }
    // collecting coins
    if (this.machineStatus === COLLECTING_COINS && emptyChecks) {
      this.display = moneyCollected;
      this.displayChecks++;
    }
    // insufficient funds
    if (this.machineStatus === INSUFFICIENT_FUNDS && emptyChecks) {
      this.display = `PRICE ${curProductPrice}`;
      this.displayChecks++;
    } else if (this.machineStatus === INSUFFICIENT_FUNDS && beenChecked) {
      resetDisplay();
      return this.checkDisplay();
    }
    // sold out
    if (this.machineStatus === SOLD_OUT && emptyChecks) {
      this.display = SOLD_OUT;
      this.displayChecks++;
    } else if (this.machineStatus === SOLD_OUT && beenChecked) {
      resetDisplay();
      return this.checkDisplay();
    }
    // CAN'T GIVE CHANGE
    if (this.machineStatus === CANT_GIVE_CHANGE && emptyChecks) {
      this.display = CANT_GIVE_CHANGE;
      this.displayChecks++;
    } else if (this.machineStatus === CANT_GIVE_CHANGE && beenChecked) {
      resetDisplay();
      return this.checkDisplay();
    }

    return this.display;
  }

  // functions for tests
  zeroProductInventory(item) {
    this.productInventory.set(item, 0);
    return this.productInventory.get(item);
  }

  setCoinInventory(coin, count = 0) {
    this.coinSlot.coinInventory.set(coin, count);
    return this.coinSlot.coinInventory.get(coin);
  }
}
module.exports = {
  VendingMachine
};
