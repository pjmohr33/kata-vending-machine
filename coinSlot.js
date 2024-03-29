// All money values are in pure cents and then formatted to dollars

// Nickel Specifications
const NICKEL_VALUE = 5;
const NICKEL_WEIGHT = 5;
const NICKEL_DIAMETER = 21.21;
const NICKEL_THICKNESS = 1.95;

// Dime Specifications
const DIME_VALUE = 10;
const DIME_WEIGHT = 2.268;
const DIME_DIAMETER = 17.91;
const DIME_THICKNESS = 1.35;

// Quarter Specifications
const QUARTER_VALUE = 25;
const QUARTER_WEIGHT = 5.670;
const QUARTER_DIAMETER = 24.26;
const QUARTER_THICKNESS = 1.75;

// bad coin or penny specs
const BAD_COIN_VALUE = 'Invalid';
const BAD_COIN_WEIGHT = 2.5;
const BAD_COIN_DIAMETER = 19.05;
const BAD_COIN_THICKNESS = 1.52;

class CoinSlot {
  constructor() {
    this.collectedMoney = 0;
    // starting change inventory for initial set-up
    this.coinInventory = new Map();
    this.coinInventory.set('Quarters', 70);
    this.coinInventory.set('Dimes', 100);
    this.coinInventory.set('Nickels', 100);
    // current inserted coin value/counts
    this.collectedCoinsCount = new Map();
    this.collectedCoinsCount.set('Nickels', 0);
    this.collectedCoinsCount.set('Dimes', 0);
    this.collectedCoinsCount.set('Quarters', 0);
  }

  insertCoin(diameter, thickness, weight) {
    // Nickel Specs
    if (diameter === NICKEL_DIAMETER &&
      thickness === NICKEL_THICKNESS &&
      weight === NICKEL_WEIGHT) {
      this.collectedMoney += NICKEL_VALUE;
      this.collectedCoinsCount.set('Nickels', this.collectedCoinsCount.get('Nickels') + 1);

      // Dime Specs
    } else if (diameter === DIME_DIAMETER &&
      thickness === DIME_THICKNESS &&
      weight === DIME_WEIGHT) {
      this.collectedMoney += DIME_VALUE;
      this.collectedCoinsCount.set('Dimes', this.collectedCoinsCount.get('Dimes') + 1);

      // Quarter Specs
    } else if (diameter === QUARTER_DIAMETER &&
      thickness === QUARTER_THICKNESS &&
      weight === QUARTER_WEIGHT) {
      this.collectedMoney += QUARTER_VALUE;
      this.collectedCoinsCount.set('Quarters', this.collectedCoinsCount.get('Quarters') + 1);
    } else {
      // puts bad coin in coin return
      return BAD_COIN_VALUE;
    }

    return this.collectedMoney;
  }

  formatCurrency(number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number / 100);
  }

  checkCollectedMoney() {
    return this.collectedMoney;
  }

  // Calculates Change after purchase
  calculateChange(moneyPaid) {
    const totalChange = this.collectedMoney - moneyPaid;
    return totalChange;
  }

  checkCoinInventory() {
    const coinInventory = this.coinInventory;
    return coinInventory;
  }
  
  // grabbing coins from change inventory for change
  pullCoinsForChange(totalChange) {
    const changePulled = new Map();
    const coinInventory = this.coinInventory;
    let newQuarterCount = coinInventory.get('Quarters');
    let newDimeCount = coinInventory.get('Dimes');
    let newNickelCount = coinInventory.get('Nickels');
    let pulledQuarters = 0;
    let pulledDimes = 0;
    let pulledNickels = 0;
    let changeRemainder = totalChange;

    const pullQuarters = () => {
      while (changeRemainder >= 25 && newQuarterCount > 0) {
        pulledQuarters++;
        newQuarterCount--;
        changeRemainder -= 25;
      }
    }

    const pullDimes = () => {
      while (changeRemainder >= 10 && newDimeCount > 0) {
        pulledDimes++;
        newDimeCount--;
        changeRemainder -= 10;
      }
    }
    const pullNickels = () => {
      while (changeRemainder >= 5 && newNickelCount > 0) {
        pulledNickels++;
        newNickelCount--;
        changeRemainder -= 5;
      }
    }

    const changeCalc = () => {
      if (changeRemainder === 0) {
        coinInventory.set('Quarters', newQuarterCount);
        coinInventory.set('Dimes', newDimeCount);
        coinInventory.set('Nickels', newNickelCount);
        changePulled.set('Quarters', pulledQuarters);
        changePulled.set('Dimes', pulledDimes);
        changePulled.set('Nickels', pulledNickels);

        return changePulled;
      } else {
        pulledQuarters -= 1;
        newQuarterCount += 1;
        changeRemainder += 25
        pullDimes();
        pullNickels();
        return changeCalc();
      }
    }

    pullQuarters();
    pullDimes();
    pullNickels();
    return changeCalc();
  }

  // Drops Calculated Change To Customer
  dispenseChange(moneyPaid) {
    const totalChange = this.calculateChange(moneyPaid);
    const pulledCoins = this.pullCoinsForChange(totalChange);
    pulledCoins.set('Nickels', 0);
    pulledCoins.set('Dimes', 0);
    pulledCoins.set('Quarters', 0);
    this.collectedMoney = 0;
    return pulledCoins;
  }

  checkCollectedCoins() {
    return this.collectedCoinsCount;
  }

  emptyBucket() {
    this.collectedMoney = 0;
    this.collectedCoinsCount.set('Nickels', 0);
    this.collectedCoinsCount.set('Dimes', 0);
    this.collectedCoinsCount.set('Quarters', 0);
  }

  returnAllCoins() {
    this.emptyBucket();
  }

  refillChange(Quarters, Dimes, Nickels) {
    this.coinInventory.set('Quarters', this.coinInventory.get('Quarters') + Quarters);
    this.coinInventory.set('Nickels', this.coinInventory.get('Nickels') + Nickels);
    this.coinInventory.set('Dimes', this.coinInventory.get('Dimes') + Dimes);
    return this.coinInventory;
  }
}

module.exports = {
  CoinSlot,
  NICKEL_VALUE,
  NICKEL_DIAMETER,
  NICKEL_THICKNESS,
  NICKEL_WEIGHT,

  DIME_VALUE,
  DIME_DIAMETER,
  DIME_THICKNESS,
  DIME_WEIGHT,

  QUARTER_VALUE,
  QUARTER_DIAMETER,
  QUARTER_THICKNESS,
  QUARTER_WEIGHT,

  BAD_COIN_VALUE,
  BAD_COIN_DIAMETER,
  BAD_COIN_THICKNESS,
  BAD_COIN_WEIGHT
};
