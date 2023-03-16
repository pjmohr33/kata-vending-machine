const {
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
  BAD_COIN_WEIGHT,
  CoinSlot
} = require('./coinSlot');

const insertMoney = (coinSlot, money) => {
  const quarters = Math.floor(money / 25);
  money -= quarters * 25;
  const dimes = Math.floor(money / 10);
  money -= dimes * 10;
  const nickels = Math.floor(money / 5);
  for (let i = quarters; i > 0; i--) {
    coinSlot.insertCoin(QUARTER_DIAMETER, QUARTER_THICKNESS, QUARTER_WEIGHT);
  }
  for (let i = dimes; i > 0; i--) {
    coinSlot.insertCoin(DIME_DIAMETER, DIME_THICKNESS, DIME_WEIGHT);
  }
  for (let i = nickels; i > 0; i--) {
    coinSlot.insertCoin(NICKEL_DIAMETER, NICKEL_THICKNESS, NICKEL_WEIGHT);
  }
};

describe('Coinslot', () => {
  it('identifies a nickel by its diameter, thickness, weight and outputs the new inserted coin value', () => {
    const coinSlot = new CoinSlot();
    const result = coinSlot.insertCoin(NICKEL_DIAMETER, NICKEL_THICKNESS, NICKEL_WEIGHT);
    expect(result).toBe(NICKEL_VALUE);
  });

  it('indentifies a dime by diameter, thickness, weight, and outputs the new inserted coin value', () => {
    const coinSlot = new CoinSlot();
    const result = coinSlot.insertCoin(DIME_DIAMETER, DIME_THICKNESS, DIME_WEIGHT);
    expect(result).toBe(DIME_VALUE);
  });

  it('indentifies a quarter by diameter, thickness, weight, and outputs the new inserted coin value', () => {
    const coinSlot = new CoinSlot();
    const result = coinSlot.insertCoin(QUARTER_DIAMETER, QUARTER_THICKNESS, QUARTER_WEIGHT);
    expect(result).toBe(QUARTER_VALUE);
  });

  it("indentifies a bad coin by diameter, thickness, weight, and outputs invalid and doesn't change the current inserted coin value", () => {
    const coinSlot = new CoinSlot();
    const result = coinSlot.insertCoin(BAD_COIN_DIAMETER, BAD_COIN_THICKNESS, BAD_COIN_WEIGHT);
    expect(result).toBe(BAD_COIN_VALUE);
  });

  it('returns 70 cents when two quarters, a dime, and two nickels are insert', () => {
    const coinSlot = new CoinSlot();
    insertMoney(coinSlot, 70);
    const collectedMonies = coinSlot.checkCollectedMoney();
    expect(collectedMonies).toBe(70);
  });

  it('tracks number of each coin inserted', () => {
    const coinSlot = new CoinSlot();
    insertMoney(coinSlot, 70);
    const countCoins = coinSlot.checkCollectedCoins();
    expect(countCoins.get('Nickles')).toBe(0);
    expect(countCoins.get('Dimes')).toBe(2);
    expect(countCoins.get('Quarters')).toBe(2);
  });

  it("returns the customer's coins when return coin's button is pressed", () => {
    const coinSlot = new CoinSlot();
    insertMoney(coinSlot, 70);
    coinSlot.ReturnCoins();
    const newCounts = coinSlot.checkCollectedCoins();
    expect(newCounts.get('Nickles')).toBe(0);
    expect(newCounts.get('Dimes')).toBe(0);
    expect(newCounts.get('Quarters')).toBe(0);
    const newValue = coinSlot.checkCollectedMoney();
    expect(newValue).toBe(0);
  });

  it('Returns 1 nickel, 1 dime, 1 quarter when it has 40 cents in change', () => {
    const coinSlot = new CoinSlot();
    const change = coinSlot.pullCoinsForChange(40);
    expect(change.get('Nickels')).toBe(1);
    expect(change.get('Dimes')).toBe(1);
    expect(change.get('Quarters')).toBe(1);
  });

  it('returns 90 cents when calculating a 50 cent purchase with 140 cents inserted', () => {
    const coinSlot = new CoinSlot();
    insertMoney(coinSlot, 140);
    const change = coinSlot.calculateChange(50);
    expect(change).toBe(90);
  });

  it('Returns 1 nickel, 1 dime, and 3 quarters when making a 50 cent purchase with 140 cents', () => {
    const coinSlot = new CoinSlot();
    const pulledCoins = coinSlot.pullCoinsForChange(90);
    expect(pulledCoins.get('Nickels')).toBe(1);
    expect(pulledCoins.get('Dimes')).toBe(1);
    expect(pulledCoins.get('Quarters')).toBe(3);
  });

  it('returns no change remaining when purchasing a product', () => {
    const coinSlot = new CoinSlot();
    const dispensedChange = coinSlot.dispenseChange(50);
    expect(dispensedChange.get('Quarters')).toBe(0);
    expect(dispensedChange.get('Dimes')).toBe(0);
    expect(dispensedChange.get('Nickels')).toBe(0);
  });
});
