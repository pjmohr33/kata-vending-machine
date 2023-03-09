const {
  NICKEL_DIAMETER,
  NICKEL_THICKNESS,
  NICKEL_WEIGHT,
  DIME_DIAMETER,
  DIME_THICKNESS,
  DIME_WEIGHT,
  QUARTER_DIAMETER,
  QUARTER_THICKNESS,
  QUARTER_WEIGHT,
  CoinSlot
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
  it('checks ability to buy a Cola', () => {
    const vendingMachine = new VendingMachine();
    insert70Cents(vendingMachine.coinSlot);
    const buyCola = vendingMachine.buyProduct('Cola');
    expect(buyCola).toBe(false);
  });

  it('checks ability to buy a Chips', () => {
    const coinSlot = new CoinSlot();
    const vendingMachine = new VendingMachine();
    insert70Cents(coinSlot);
    const buyChips = vendingMachine.buyProduct('Chips');
    expect(buyChips).toBe(true);
  });

  it('checks ability to buy a Candy', () => {
    const vendingMachine = new VendingMachine();
    insert70Cents(vendingMachine.coinSlot);
    const buyCandy = vendingMachine.buyProduct('Candy');
    expect(buyCandy).toBe(true);
  });

  xit('checks amount of change dispensed', () => {
    const vendingMachine = new VendingMachine();
    insert70Cents(vendingMachine.coinSlot);
    const buyCandy = vendingMachine.buyProduct('Candy');
    expect(changeDispensed.get('Nickels')).toBe(1);
  });
});
