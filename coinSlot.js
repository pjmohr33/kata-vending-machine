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

// current inserted coin value/counts
let collectedMoney;
let collectedCoinsCount;

class CoinSlot {
  constructor () {
    collectedMoney = 0;
    collectedCoinsCount = new Map();
    collectedCoinsCount.set('Nickles', 0);
    collectedCoinsCount.set('Dimes', 0);
    collectedCoinsCount.set('Quarters', 0);
  }

  insertCoin (diameter, thickness, weight) {
    // Nickel Specs
    if (diameter === NICKEL_DIAMETER &&
      thickness === NICKEL_THICKNESS &&
      weight === NICKEL_WEIGHT) {
      collectedMoney += NICKEL_VALUE;
      collectedCoinsCount.set('Nickles', collectedCoinsCount.get('Nickles') + 1);
      return collectedMoney;

      // Dime Specs
    } else if (diameter === DIME_DIAMETER &&
      thickness === DIME_THICKNESS &&
      weight === DIME_WEIGHT) {
      collectedMoney += DIME_VALUE;
      collectedCoinsCount.set('Dimes', collectedCoinsCount.get('Dimes') + 1);
      return collectedMoney;
    } else if (diameter === QUARTER_DIAMETER &&
      thickness === QUARTER_THICKNESS &&
      weight === QUARTER_WEIGHT) {
      collectedMoney += QUARTER_VALUE;
      collectedCoinsCount.set('Quarters', collectedCoinsCount.get('Quarters') + 1);
      return collectedMoney;
    } else {
      return BAD_COIN_VALUE;
    }
  }

  formatCurrency (number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number / 100);
  }

  checkCollectedMoney () {
    return collectedMoney;
  }

  // Calculates Change after purchase
  calculateChange (moneyPaid) {
    const totalChange = collectedMoney - moneyPaid;
    this.pullCoinsForChange(totalChange);
    return totalChange;
  }

  // grabbing coins from change inventory for change
  pullCoinsForChange (totalChange) {
    const quarterReturn = Math.floor(totalChange / 25);
    totalChange -= quarterReturn * 25;
    const dimeReturn = Math.floor(totalChange / 10);
    totalChange -= dimeReturn * 10;
    const nickelReturn = Math.floor(totalChange / 5);
    totalChange -= nickelReturn * 5;
    return this.dispenseChange(nickelReturn, dimeReturn, quarterReturn);
  }

  // Drops Calculated Change To Customer
  dispenseChange (nickelReturn, dimeReturn, quarterReturn) {
    const changeDispensed = new Map();
    changeDispensed.set('Nickels', nickelReturn);
    changeDispensed.set('Dimes', dimeReturn);
    changeDispensed.set('Quarters', quarterReturn);
    return changeDispensed;
  }

  checkCollectedCoins () {
    return collectedCoinsCount;
  }

  EmptyBucket () {
    collectedMoney = 0;
    collectedCoinsCount.set('Nickles', 0);
    collectedCoinsCount.set('Dimes', 0);
    collectedCoinsCount.set('Quarters', 0);
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
