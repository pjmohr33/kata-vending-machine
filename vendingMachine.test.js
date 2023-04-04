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

const vendingMachineInsert70Cents = (vendingMachine) => {
  vendingMachine.insertCoin(NICKEL_DIAMETER, NICKEL_THICKNESS, NICKEL_WEIGHT);
  vendingMachine.insertCoin(NICKEL_DIAMETER, NICKEL_THICKNESS, NICKEL_WEIGHT);
  vendingMachine.insertCoin(QUARTER_DIAMETER, QUARTER_THICKNESS, QUARTER_WEIGHT);
  vendingMachine.insertCoin(QUARTER_DIAMETER, QUARTER_THICKNESS, QUARTER_WEIGHT);
  vendingMachine.insertCoin(DIME_DIAMETER, DIME_THICKNESS, DIME_WEIGHT);
};

const coinSlotInsert70Cents = (coinSlot) => {
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

  it('checks ability to buy a Cola', () => {
    coinSlotInsert70Cents(vendingMachine.coinSlot);
    const buyCola = vendingMachine.buyProduct('Cola');
    expect(buyCola).toBe('PRICE $1.00');
    expect(vendingMachine.checkDisplay()).toBe('$0.70');
  });

  it('checks ability to buy a Chips', () => {
    coinSlotInsert70Cents(vendingMachine.coinSlot);
    const buyChips = vendingMachine.buyProduct('Chips');
    expect(buyChips).toBe('THANK YOU');
  });

  it('checks ability to buy a Candy', () => {
    coinSlotInsert70Cents(vendingMachine.coinSlot);
    const buyCandy = vendingMachine.buyProduct('Candy');
    expect(buyCandy).toBe('THANK YOU');
    expect(vendingMachine.checkDisplay()).toBe('INSERT COIN');
  });

  it("selects an item and check's price, check again and get's insert coin", () => {
    expect(vendingMachine.buyProduct('Cola')).toBe('PRICE $1.00');
    expect(vendingMachine.checkDisplay()).toBe('INSERT COIN');
  });

  it('inserts coins in the vending machine insert coin function, checks display for current coin value', () => {
    vendingMachineInsert70Cents(vendingMachine);
    expect(vendingMachine.checkDisplay()).toBe('$0.70');
  });

  it('makes sure our functions for testing are working properly', () => {
    expect(vendingMachine.zeroProductInventory('Cola')).toBe(0);
    expect(vendingMachine.zeroCoinInventory('Quarters')).toBe(0);
  });

  it('zeros inventory and then tries to buy something that is out of stock', () => {
    vendingMachine.zeroProductInventory('Cola');
    expect(vendingMachine.buyProduct('Cola')).toBe('SOLD OUT');
    expect(vendingMachine.buyProduct('Cola')).toBe('INSERT COIN');
  });

  it('displays exact change only when below acceptable nickel inventory levels', () => {
    vendingMachine.zeroCoinInventory('Nickels');
    expect(vendingMachine.checkDisplay()).toBe('EXACT CHANGE ONLY');
  });

  it('displays exact change only when below acceptable dime or quarter inventory levels', () => {
    vendingMachine.zeroCoinInventory('Quarters');
    vendingMachine.zeroCoinInventory('Dimes');
    expect(vendingMachine.checkDisplay()).toBe('EXACT CHANGE ONLY');
  });
});
