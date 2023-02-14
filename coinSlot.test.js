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

const insert70Cents = (coinSlot) => {
  coinSlot.insertCoin(NICKEL_DIAMETER, NICKEL_THICKNESS, NICKEL_WEIGHT);
  coinSlot.insertCoin(NICKEL_DIAMETER, NICKEL_THICKNESS, NICKEL_WEIGHT);
  coinSlot.insertCoin(QUARTER_DIAMETER, QUARTER_THICKNESS, QUARTER_WEIGHT);
  coinSlot.insertCoin(QUARTER_DIAMETER, QUARTER_THICKNESS, QUARTER_WEIGHT);
  coinSlot.insertCoin(DIME_DIAMETER, DIME_THICKNESS, DIME_WEIGHT);
};

describe('Coinslot', () => {
  it('identifies a nickel by its diameter, thickness, weight and outputs the new inserted coin value', () => {
    const coinSlot = new CoinSlot();
    // const NewSlot = new CoinSlot();
    const result = coinSlot.insertCoin(NICKEL_DIAMETER, NICKEL_THICKNESS, NICKEL_WEIGHT);
    expect(result).toBe(NICKEL_VALUE);
    // const NewResult = coinSlot.insertCoin(QUARTER_DIAMETER, QUARTER_THICKNESS, QUARTER_WEIGHT);
    // expect(NewResult).toBe(QUARTER_VALUE);
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
    insert70Cents(coinSlot);
    const collectedMonies = coinSlot.checkCollectedMoney();
    expect(collectedMonies).toBe(0.7);
  });

  it('tracks number of each coin inserted', () => {
    const coinSlot = new CoinSlot();
    insert70Cents(coinSlot);
    const countCoins = coinSlot.checkCollectedCoins();
    expect(countCoins.get('Nickles')).toBe(2);
    expect(countCoins.get('Dimes')).toBe(1);
    expect(countCoins.get('Quarters')).toBe(2);
  });

  it("returns the customer's coins when return coin's button is pressed", () => {
    const coinSlot = new CoinSlot();
    insert70Cents(coinSlot);
    coinSlot.ReturnCoins();
    const newCounts = coinSlot.checkCollectedCoins();
    expect(newCounts.get('Nickles')).toBe(0);
    expect(newCounts.get('Dimes')).toBe(0);
    expect(newCounts.get('Quarters')).toBe(0);
    const newValue = coinSlot.checkCollectedMoney();
    expect(newValue).toBe(0);
  });

  it('checks ability to buy a product', () => {
    const coinSlot = new CoinSlot();
    insert70Cents(coinSlot);
  });
});
