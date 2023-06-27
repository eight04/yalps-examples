import {solve, greaterEq, lessEq} from "yalps";

const constraints = {
  ap: greaterEq(-(
    24*60/6 +
    150 +
    200/7 +
    22.32*24 +
    90*4 -
    150
  ) * 13),
  p1: greaterEq(
    400 + 150*10 + 40*40 + 10*100 +
    40*10 + 25*30 + 15*80 + 5*150 +
    70*5 + 35*15 + 20*50 + 10*200 +
    1000 -
    3885
  ),
  p2: greaterEq(
    40*5 + 30*15 + 20*30 + 10*60 +
    70*5+35*15+20*50+10*200 -
    3980
  ),
};

const variables = {
  s9: {
    ap: -20,
    p1: 18 + 15,
    p2: 18 + 19,
    p3: 6 + 7
  },
  s10: {
    ap: -20,
    p1: 30 + 24,
    p3: 6 + 7
  },
  s11: {
    ap: -20,
    p2: 30 + 32,
    p3: 6 + 7
  },
  s12: {
    ap: -20,
    p3: 30 + 33
  }
};

const integers = [
  ...Object.keys(variables)
];

const result = solve({
  direction: "maximize",
  objective: "p3",
  constraints,
  variables,
  integers,
});

console.log(result);
