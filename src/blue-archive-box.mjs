import {solve, greaterEq, lessEq} from "yalps";

const constraints = {
  ap: greaterEq(-(
    24*60/6 +
    150 +
    200/7 +
    22.32*24 +
    90
  ) * 14),
  p1: greaterEq(
    150*1+75*10+25*40+10*200+
    8*10+6*30+4*100+1*300+
    70*5+35*15+20*50+10*200 - 1187),
  p2: greaterEq(
    25*5+20*15+15*50+10*200+
    70*5+35*15+20*50+10*200+
    1000 - 1138),
};

const variables = {
  s9: {
    ap: -20,
    p1: 8+7,
    p2: 8+7,
    p3: 28+17
  },
  s10: {
    ap: -20,
    p1: 28+23,
    p3: 16+10
  },
  s11: {
    ap: -20,
    p2: 28+23,
    p3: 16+10
  },
  s12: {
    ap: -20,
    p3: 40+24
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
