// All money values are in pure cents and then formatted to dollars

// Nickle Specifications
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
  constructor () {
    this.collectedMoney = 0;
    // current inserted coin value/counts
    this.collectedCoinsCount = new Map();
    this.collectedCoinsCount.set('Nickles', 0);
    this.collectedCoinsCount.set('Dimes', 0);
    this.collectedCoinsCount.set('Quarters', 0);
  }

  insertCoin (diameter, thickness, weight) {
    // Nickel Specs
    if (diameter === NICKEL_DIAMETER &&
      thickness === NICKEL_THICKNESS &&
      weight === NICKEL_WEIGHT) {
      this.collectedMoney += NICKEL_VALUE;
      this.collectedCoinsCount.set('Nickles', this.collectedCoinsCount.get('Nickles') + 1);
      return this.collectedMoney;

      // Dime Specs
    } else if (diameter === DIME_DIAMETER &&
      thickness === DIME_THICKNESS &&
      weight === DIME_WEIGHT) {
      this.collectedMoney += DIME_VALUE;
      this.collectedCoinsCount.set('Dimes', this.collectedCoinsCount.get('Dimes') + 1);
      return this.collectedMoney;
    } else if (diameter === QUARTER_DIAMETER &&
      thickness === QUARTER_THICKNESS &&
      weight === QUARTER_WEIGHT) {
      this.collectedMoney += QUARTER_VALUE;
      this.collectedCoinsCount.set('Quarters', this.collectedCoinsCount.get('Quarters') + 1);
      return this.collectedMoney;
    } else {
      return BAD_COIN_VALUE;
    }
  }

  formatCurrency (number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number / 100);
  }

  checkCollectedMoney () {
    return this.collectedMoney;
  }

  // Calculates Change after purchase
  calculateChange (moneyPaid) {
    const totalChange = this.collectedMoney - moneyPaid;
    return totalChange;
  }

  // grabbing coins from change inventory for change
  pullCoinsForChange (totalChange) {
    const changePulled = new Map();
    changePulled.set('Quarters', Math.floor(totalChange / 25));
    totalChange -= changePulled.get('Quarters') * 25;
    changePulled.set('Dimes', Math.floor(totalChange / 10));
    totalChange -= changePulled.get('Dimes') * 10;
    changePulled.set('Nickels', Math.floor(totalChange / 5));
    totalChange -= changePulled.get('Nickels') * 5;
    return changePulled;
  }

  // Drops Calculated Change To Customer
  dispenseChange (moneyPaid) {
    const totalChange = this.calculateChange(moneyPaid);
    const pulledCoins = this.pullCoinsForChange(totalChange);
    pulledCoins.set('Nickels', 0);
    pulledCoins.set('Dimes', 0);
    pulledCoins.set('Quarters', 0);
    return pulledCoins;
  }

  checkCollectedCoins () {
    return this.collectedCoinsCount;
  }

  EmptyBucket () {
    this.collectedMoney = 0;
    this.collectedCoinsCount.set('Nickles', 0);
    this.collectedCoinsCount.set('Dimes', 0);
    this.collectedCoinsCount.set('Quarters', 0);
  }

  ReturnCoins () {
    this.EmptyBucket();
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
