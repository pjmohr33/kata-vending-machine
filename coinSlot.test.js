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
  BAD_COIN_WEIGHT
} = require("./coinSlot");

describe('coin slot', () => {
  it("identifies a nickel by its diameter, thickness, weight and outputs a nickel's value", () => {
    const result = coinValue(NICKEL_DIAMETER, NICKEL_THICKNESS, NICKEL_WEIGHT);
    expect(result).toBe(NICKEL_VALUE);
  });

  it("indentifies a dime by diameter, thickness, weight, and outputs a dime's value",() => {
    const result = coinValue(DIME_DIAMETER,DIME_THICKNESS,DIME_WEIGHT);
    expect(result).toBe(DIME_VALUE);
  });

  it("indentifies a quarter by diameter, thickness, weight, and outputs a quarter's value", () => {
    const result = coinValue(QUARTER_DIAMETER,QUARTER_THICKNESS,QUARTER_WEIGHT);
    expect(result).toBe(QUARTER_VALUE);
  });

  it("indentifies a quarter by diameter, thickness, weight, and outputs a quarter's value", () => {
    const result = coinValue(BAD_COIN_DIAMETER,BAD_COIN_THICKNESS,BAD_COIN_WEIGHT);
    expect(result).toBe(BAD_COIN_VALUE);
  });
});
