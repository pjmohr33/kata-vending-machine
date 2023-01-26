//Nickle Specifications
const NICKEL_VALUE = .05;
const NICKEL_WEIGHT = 5;
const NICKEL_DIAMETER = 21.21;
const NICKEL_THICKNESS = 1.95;

//Dime Specifications
const DIME_VALUE = .1;
const DIME_WEIGHT = 2.268;
const DIME_DIAMETER = 17.91;
const DIME_THICKNESS = 1.35;

//Quarter Specifications
const QUARTER_VALUE = .25;
const QUARTER_WEIGHT = 5.670;
const QUARTER_DIAMETER = 24.26;
const QUARTER_THICKNESS = 1.75;

//bad coin or penny specs
const BAD_COIN_VALUE = "Invalid";
const BAD_COIN_WEIGHT = 2.5;
const BAD_COIN_DIAMETER = 19.05;
const BAD_COIN_THICKNESS = 1.52;

function coinValue(diameter, thickness, weight) {
  //Nickel Specs
  if (diameter === NICKEL_DIAMETER &&
    thickness === NICKEL_THICKNESS &&
    weight === NICKEL_WEIGHT) {
    return NICKEL_VALUE;
    //Dime Specs
  } else if (diameter === DIME_DIAMETER &&
    thickness === DIME_THICKNESS &&
    weight === DIME_WEIGHT) {
    return DIME_VALUE;
  } else if (diameter === QUARTER_DIAMETER &&
    thickness === QUARTER_THICKNESS &&
    weight === QUARTER_WEIGHT) {
    return QUARTER_VALUE;
  } else {
    return BAD_COIN_VALUE
  }
}

module.exports = {
  coinValue,
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
