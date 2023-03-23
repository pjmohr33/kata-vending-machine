const {
  NICKEL_DIAMETER,
  NICKEL_THICKNESS,
  NICKEL_WEIGHT,
  DIME_DIAMETER,
  DIME_THICKNESS,
  DIME_WEIGHT,
  QUARTER_DIAMETER,
  QUARTER_THICKNESS,
  QUARTER_WEIGHT
} = require('./coinSlot');

const {
  VendingMachine
} = require('./vendingMachine');

const insert70Cents = (coinSlot) => {
  coinSlot.insertCoin(NICKEL_DIAMETER, NICKEL_THICKNESS, NICKEL_WEIGHT);
  coinSlot.insertCoin(NICKEL_DIAMETER, NICKEL_THICKNESS, NICKEL_WEIGHT);
  coinSlot.insertCoin(QUARTER_DIAMETER, QUARTER_THICKNESS, QUARTER_WEIGHT);
  coinSlot.insertCoin(QUARTER_DIAMETER, QUARTER_THICKNESS, QUARTER_WEIGHT);
  coinSlot.insertCoin(DIME_DIAMETER, DIME_THICKNESS, DIME_WEIGHT);
};

describe('Vending Machine', () => {
  let vendingMachine;
  beforeEach(() => {
    vendingMachine = new VendingMachine();
  });
  xit('checks ability to buy a Cola', () => {
    insert70Cents(vendingMachine.coinSlot);
    const buyCola = vendingMachine.buyProduct('Cola');
    expect(buyCola).toBe(false);
  });

  it('checks ability to buy a Chips', () => {
    insert70Cents(vendingMachine.coinSlot);
    const buyChips = vendingMachine.buyProduct('Chips');
    expect(buyChips).toBe('1 Chips');
    expect(vendingMachine.checkDisplay()).toBe('THANK YOU');
  });

  it('checks ability to buy a Candy', () => {
    insert70Cents(vendingMachine.coinSlot);
    const buyCandy = vendingMachine.buyProduct('Candy');
    expect(buyCandy).toBe('1 Candy');
    expect(vendingMachine.checkDisplay()).toBe('THANK YOU');
    expect(vendingMachine.checkDisplay()).toBe('INSERT COIN');
  });
  it("selects an item and check's price, check again and get's insert coin", () => {
    vendingMachine.selectProduct('Cola');
    expect(vendingMachine.checkDisplay()).toBe('PRICE $1.00');
  });


});
