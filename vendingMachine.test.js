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

  it('Display says "PRICE $1.00" and then $0.70 after a second check when trying to buy cola with insufficent funds', () => {
    coinSlotInsert70Cents(vendingMachine.coinSlot);
    const buyCola = vendingMachine.buyProduct('Cola');
    expect(buyCola).toBe('PRICE $1.00');
    expect(vendingMachine.checkDisplay()).toBe('$0.70');
  });

  it('Display says "THANK YOU" and then "INSERT COIN" after a second check when trying to buy chips with proper funds', () => {
    coinSlotInsert70Cents(vendingMachine.coinSlot);
    const buyChips = vendingMachine.buyProduct('Chips');
    expect(buyChips).toBe('THANK YOU');
    expect(vendingMachine.checkDisplay()).toBe('INSERT COIN');
  });

  it('Display says "THANK YOU" and then "INSERT COIN" after a second check when trying to buy candy with proper funds', () => {
    coinSlotInsert70Cents(vendingMachine.coinSlot);
    const buyCandy = vendingMachine.buyProduct('Candy');
    expect(buyCandy).toBe('THANK YOU');
    expect(vendingMachine.checkDisplay()).toBe('INSERT COIN');
  });

  it('selects to buy Cola and display says "Price $1.00", check again and gets "INSERT COIN"', () => {
    expect(vendingMachine.buyProduct('Cola')).toBe('PRICE $1.00');
    expect(vendingMachine.checkDisplay()).toBe('INSERT COIN');
  });

  it('inserts $.70 in the vending machine, checks display for "$0.70"', () => {
    vendingMachineInsert70Cents(vendingMachine);
    expect(vendingMachine.checkDisplay()).toBe('$0.70');
  });

  it('Ensure all functions for testing are functional', () => {
    expect(vendingMachine.zeroProductInventory('Cola')).toBe(0);
    expect(vendingMachine.zeroProductInventory('Candy')).toBe(0);
    expect(vendingMachine.zeroProductInventory('Chips')).toBe(0);
    expect(vendingMachine.setCoinInventory('Quarters')).toBe(0);
    expect(vendingMachine.setCoinInventory('Dimes')).toBe(0);
    expect(vendingMachine.setCoinInventory('Nickels')).toBe(0);
    expect(vendingMachine.setCoinInventory('Quarters', 1)).toBe(1);
    expect(vendingMachine.setCoinInventory('Dimes', 1)).toBe(1);
    expect(vendingMachine.setCoinInventory('Nickels', 1)).toBe(1);
  });

  it('Zeros all products inventory and then displays "SOLD OUT" everytime a purchase attempt is made with no money in the machine', () => {
    vendingMachine.zeroProductInventory('Cola');
    expect(vendingMachine.buyProduct('Cola')).toBe('SOLD OUT');
    expect(vendingMachine.buyProduct('Cola')).toBe('SOLD OUT');
    vendingMachine.zeroProductInventory('Chips');
    expect(vendingMachine.buyProduct('Chips')).toBe('SOLD OUT');
    expect(vendingMachine.buyProduct('Chips')).toBe('SOLD OUT');
    vendingMachine.zeroProductInventory('Candy');
    expect(vendingMachine.buyProduct('Candy')).toBe('SOLD OUT');
    expect(vendingMachine.buyProduct('Candy')).toBe('SOLD OUT');
  });

  it('Zeros all products inventory and then displays "SOLD OUT" everytime a purchase attempt is made with money in the machine', () => {
    vendingMachineInsert70Cents(vendingMachine);
    vendingMachine.zeroProductInventory('Cola');
    expect(vendingMachine.buyProduct('Cola')).toBe('SOLD OUT');
    expect(vendingMachine.buyProduct('Cola')).toBe('SOLD OUT');
    vendingMachine.zeroProductInventory('Chips');
    expect(vendingMachine.buyProduct('Chips')).toBe('SOLD OUT');
    expect(vendingMachine.buyProduct('Chips')).toBe('SOLD OUT');
    vendingMachine.zeroProductInventory('Candy');
    expect(vendingMachine.buyProduct('Candy')).toBe('SOLD OUT');
    expect(vendingMachine.buyProduct('Candy')).toBe('SOLD OUT');
  });

  it('Zeros all products inventory and then displays "SOLD OUT" everytime a purchase attempt, but displays "INSERT COIN" when checking the display again', () => {
    vendingMachine.zeroProductInventory('Cola');
    expect(vendingMachine.buyProduct('Cola')).toBe('SOLD OUT');
    expect(vendingMachine.checkDisplay()).toBe('INSERT COIN');
    vendingMachine.zeroProductInventory('Chips');
    expect(vendingMachine.buyProduct('Chips')).toBe('SOLD OUT');
    expect(vendingMachine.checkDisplay()).toBe('INSERT COIN');
    vendingMachine.zeroProductInventory('Candy');
    expect(vendingMachine.buyProduct('Candy')).toBe('SOLD OUT');
    expect(vendingMachine.checkDisplay()).toBe('INSERT COIN');
  });

  it('Zeros all products inventory and then displays "SOLD OUT" everytime a purchase attempt, but displays "INSERT COIN" when checking the display again', () => {
    vendingMachineInsert70Cents(vendingMachine);
    vendingMachine.zeroProductInventory('Cola');
    expect(vendingMachine.buyProduct('Cola')).toBe('SOLD OUT');
    expect(vendingMachine.checkDisplay()).toBe('$0.70');
    vendingMachine.zeroProductInventory('Chips');
    expect(vendingMachine.buyProduct('Chips')).toBe('SOLD OUT');
    expect(vendingMachine.checkDisplay()).toBe('$0.70');
    vendingMachine.zeroProductInventory('Candy');
    expect(vendingMachine.buyProduct('Candy')).toBe('SOLD OUT');
    expect(vendingMachine.checkDisplay()).toBe('$0.70');
  });

  it('displays exact change only when less then 2 quarter 1 dime and no nickels', () => {
    vendingMachine.setCoinInventory('Nickels');
    vendingMachine.setCoinInventory('Quarters', 1);
    vendingMachine.setCoinInventory('Dimes');
    expect(vendingMachine.checkDisplay()).toBe('EXACT CHANGE ONLY');
  });

  it('displays exact change only when less then 1 quarter 2 dime and 1 nickel', () => {
    vendingMachine.setCoinInventory('Nickels');
    vendingMachine.setCoinInventory('Quarters');
    vendingMachine.setCoinInventory('Dimes', 1);
    expect(vendingMachine.checkDisplay()).toBe('EXACT CHANGE ONLY');
  });

  it('displays exact change only when no quarters and nickels and less than 5 dimes', () => {
    vendingMachine.setCoinInventory('Nickels');
    vendingMachine.setCoinInventory('Quarters');
    vendingMachine.setCoinInventory('Dimes', 4);
    expect(vendingMachine.checkDisplay()).toBe('EXACT CHANGE ONLY');
  });

  it('displays exact change only when no quarters and dimes and less than 10 nickels', () => {
    vendingMachine.setCoinInventory('Nickels', 9);
    vendingMachine.setCoinInventory('Quarters');
    vendingMachine.setCoinInventory('Dimes');
    expect(vendingMachine.checkDisplay()).toBe('EXACT CHANGE ONLY');
  });
});
