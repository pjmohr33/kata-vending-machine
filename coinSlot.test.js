const { coinValue,
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
} = require("./coinSlot");

describe('calculate coin value', () => {
  it("identifies a nickel by its diameter, thickness, weight and outputs the new inserted coin value", () => {
    let coinSlot = new CoinSlot();
    // const poopSlot = new CoinSlot();
    const result = coinSlot.insertCoin(NICKEL_DIAMETER, NICKEL_THICKNESS, NICKEL_WEIGHT);
    expect(result).toBe(NICKEL_VALUE);
    // const poopResult = coinSlot.insertCoin(QUARTER_DIAMETER, QUARTER_THICKNESS, QUARTER_WEIGHT);
    // expect(poopResult).toBe(QUARTER_VALUE);
  });

  it("indentifies a dime by diameter, thickness, weight, and outputs the new inserted coin value", () => {
    let coinSlot = new CoinSlot();
    const result = coinSlot.insertCoin(DIME_DIAMETER, DIME_THICKNESS, DIME_WEIGHT);
    expect(result).toBe(DIME_VALUE);
  });

  it("indentifies a quarter by diameter, thickness, weight, and outputs the new inserted coin value", () => {
    let coinSlot = new CoinSlot();
    const result = coinSlot.insertCoin(QUARTER_DIAMETER, QUARTER_THICKNESS, QUARTER_WEIGHT);
    expect(result).toBe(QUARTER_VALUE);
  });

  it("indentifies a bad coin by diameter, thickness, weight, and outputs invalid and doesn't change the current inserted coin value", () => {
    let coinSlot = new CoinSlot();
    const result = coinSlot.insertCoin(BAD_COIN_DIAMETER, BAD_COIN_THICKNESS, BAD_COIN_WEIGHT);
    expect(result).toBe(BAD_COIN_VALUE);
  });

  it("returns 70 cents when two quarters, a dime, and two nickels are insert", () => {
    let coinSlot = new CoinSlot();
    coinSlot.insertCoin(NICKEL_DIAMETER, NICKEL_THICKNESS, NICKEL_WEIGHT);
    coinSlot.insertCoin(NICKEL_DIAMETER, NICKEL_THICKNESS, NICKEL_WEIGHT);
    coinSlot.insertCoin(QUARTER_DIAMETER, QUARTER_THICKNESS, QUARTER_WEIGHT);
    coinSlot.insertCoin(QUARTER_DIAMETER, QUARTER_THICKNESS, QUARTER_WEIGHT);
    coinSlot.insertCoin(DIME_DIAMETER, DIME_THICKNESS, DIME_WEIGHT);
    const collectedMonies = coinSlot.checkCollectedMoney();
    expect(collectedMonies).toBe(.7)
  });

  it("tracks number of each coin inserted", ()=>{
    let coinSlot = new CoinSlot();
    coinSlot.insertCoin(NICKEL_DIAMETER, NICKEL_THICKNESS, NICKEL_WEIGHT);
    coinSlot.insertCoin(NICKEL_DIAMETER, NICKEL_THICKNESS, NICKEL_WEIGHT);
    coinSlot.insertCoin(QUARTER_DIAMETER, QUARTER_THICKNESS, QUARTER_WEIGHT);
    coinSlot.insertCoin(QUARTER_DIAMETER, QUARTER_THICKNESS, QUARTER_WEIGHT);
    coinSlot.insertCoin(DIME_DIAMETER, DIME_THICKNESS, DIME_WEIGHT);
    const countCoins = coinSlot.checkCollectedCoins();
    expect(countCoins.get("Nickles")).toBe(2);
    expect(countCoins.get("Dimes")).toBe(1);
    expect(countCoins.get("Quarters")).toBe(2);
  });
});
