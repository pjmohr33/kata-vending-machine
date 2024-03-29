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
  let coinSlot;
  beforeEach(() => {
    coinSlot = new CoinSlot();
  });
  it("identifies a nickel by its diameter, thickness, weight and outputs the nickel's coin value", () => {
    const result = coinSlot.insertCoin(NICKEL_DIAMETER, NICKEL_THICKNESS, NICKEL_WEIGHT);
    expect(result).toBe(NICKEL_VALUE);
  });

  it("indentifies a dime by diameter, thickness, weight, and outputs the dime's coin value", () => {
    const result = coinSlot.insertCoin(DIME_DIAMETER, DIME_THICKNESS, DIME_WEIGHT);
    expect(result).toBe(DIME_VALUE);
  });

  it("indentifies a quarter by diameter, thickness, weight, and outputs the quarter's coin value", () => {
    const result = coinSlot.insertCoin(QUARTER_DIAMETER, QUARTER_THICKNESS, QUARTER_WEIGHT);
    expect(result).toBe(QUARTER_VALUE);
  });

  it("indentifies a bad coin by diameter, thickness, weight, and outputs invalid and doesn't change the current inserted coin value", () => {
    const result = coinSlot.insertCoin(BAD_COIN_DIAMETER, BAD_COIN_THICKNESS, BAD_COIN_WEIGHT);
    expect(result).toBe(BAD_COIN_VALUE);
  });

  it('returns 70 cents when two quarters, a dime, and two nickels are insert', () => {
    insertMoney(coinSlot, 70);
    const collectedMonies = coinSlot.checkCollectedMoney();
    expect(collectedMonies).toBe(70);
  });

  it('inserts 70 cents and tracks total count of each coin inserted', () => {
    insertMoney(coinSlot, 70);
    const countCoins = coinSlot.checkCollectedCoins();
    expect(countCoins.get('Nickels')).toBe(0);
    expect(countCoins.get('Dimes')).toBe(2);
    expect(countCoins.get('Quarters')).toBe(2);
  });

  it('returns 70 cents when "return coins" button is pressed', () => {
    insertMoney(coinSlot, 70);
    coinSlot.returnAllCoins();
    const newCounts = coinSlot.checkCollectedCoins();
    expect(newCounts.get('Nickels')).toBe(0);
    expect(newCounts.get('Dimes')).toBe(0);
    expect(newCounts.get('Quarters')).toBe(0);
    const newValue = coinSlot.checkCollectedMoney();
    expect(newValue).toBe(0);
  });

  it('Returns 1 nickel, 1 dime, 1 quarter when it has 40 cents in change', () => {
    const change = coinSlot.pullCoinsForChange(40);
    expect(change.get('Nickels')).toBe(1);
    expect(change.get('Dimes')).toBe(1);
    expect(change.get('Quarters')).toBe(1);
  });

  it('returns 90 cents when calculating a 50 cent purchase with 140 cents inserted', () => {
    insertMoney(coinSlot, 140);
    const change = coinSlot.calculateChange(50);
    expect(change).toBe(90);
  });

  it('Returns 1 nickel, 1 dime, and 3 quarters when making a 50 cent purchase with 140 cents', () => {
    insertMoney(coinSlot, 140);
    const pulledCoins = coinSlot.pullCoinsForChange(90);
    expect(pulledCoins.get('Nickels')).toBe(1);
    expect(pulledCoins.get('Dimes')).toBe(1);
    expect(pulledCoins.get('Quarters')).toBe(3);
  });

  it('Returns 9 dimes, and 0 quarters and 0 nickels when making a 50 cent purchase with 140 cents and no quarter inventory', () => {
    insertMoney(coinSlot, 140);
    coinSlot.coinInventory.set('Quarters', 0);
    const pulledCoins = coinSlot.pullCoinsForChange(90);
    expect(pulledCoins.get('Nickels')).toBe(0);
    expect(pulledCoins.get('Dimes')).toBe(9);
    expect(pulledCoins.get('Quarters')).toBe(0);
  });

  it('Returns 2 quarters, and 4 dimes and 0 nickels when making a 50 cent purchase with 140 cents and no quarter inventory', () => {
    insertMoney(coinSlot, 140);
    coinSlot.coinInventory.set('Nickels', 0);
    const pulledCoins = coinSlot.pullCoinsForChange(90);
    expect(pulledCoins.get('Nickels')).toBe(0);
    expect(pulledCoins.get('Dimes')).toBe(4);
    expect(pulledCoins.get('Quarters')).toBe(2);
  });

  it('Returns 1 quarters, and 4 dimes and 0 nickels when making a 50 cent purchase with 115 cents and no nickel inventory', () => {
    insertMoney(coinSlot, 115);
    coinSlot.coinInventory.set('Nickels', 0);
    const pulledCoins = coinSlot.pullCoinsForChange(65);
    expect(pulledCoins.get('Nickels')).toBe(0);
    expect(pulledCoins.get('Dimes')).toBe(4);
    expect(pulledCoins.get('Quarters')).toBe(1);
  });

  it('Returns 9 dimes, and 0 quarters and 0 nickels when making a 50 cent purchase with 140 cents and no quarter inventory', () => {
    insertMoney(coinSlot, 140);
    coinSlot.coinInventory.set('Quarters', 0);
    const pulledCoins = coinSlot.pullCoinsForChange(90);
    expect(pulledCoins.get('Nickels')).toBe(0);
    expect(pulledCoins.get('Dimes')).toBe(9);
    expect(pulledCoins.get('Quarters')).toBe(0);
  });

  it('Returns "0" in all coin values when finished dispensing change', () => {
    const dispensedChange = coinSlot.dispenseChange(50);
    expect(dispensedChange.get('Quarters')).toBe(0);
    expect(dispensedChange.get('Dimes')).toBe(0);
    expect(dispensedChange.get('Nickels')).toBe(0);
  });

  it('returns 2 quarters, 1 dime, 1 nickel with full inventory and 65 cents of change', () => {
    const pulledCoins = coinSlot.pullCoinsForChange(65);
    expect(pulledCoins.get('Quarters')).toBe(2);
    expect(pulledCoins.get('Dimes')).toBe(1);
    expect(pulledCoins.get('Nickels')).toBe(1);
  });

  it('returns 40 cents when buying a 60 cent product with 100 cents in machine', () => {
    insertMoney(coinSlot, 100);
    const change = coinSlot.calculateChange(60);
    expect(change).toBe(40);
  });

  it('checks that checkCoinInventory works and initial coin inventory is added', () => {
    const coinInventory = coinSlot.checkCoinInventory();
    expect(coinInventory.get('Quarters')).toBe(70);
    expect(coinInventory.get('Dimes')).toBe(100);
    expect(coinInventory.get('Nickels')).toBe(100);
  });

  it('refill coin inventory', () => {
    coinSlot.refillChange(50, 20, 100);
    const coinInventory = coinSlot.checkCoinInventory();
    expect(coinInventory.get('Quarters')).toBe(120);
    expect(coinInventory.get('Dimes')).toBe(120);
    expect(coinInventory.get('Nickels')).toBe(200);
  });
});
