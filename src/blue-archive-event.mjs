import {solve, greaterEq, lessEq} from "yalps";

const constraints = {
  p1: greaterEq(600+1500+360+600 - 2419),
  p2: greaterEq(1200+2500+1400 - 5020),
  p3: greaterEq(450+600+750+750+750+750 - 3887),
  p4: greaterEq(10000 - 8723)
};

const variables = {
  s9: {
    cost: 15,
    p1: 53,
    p4: 12
  },
  s10: {
    cost: 15,
    p2: 42,
    p4: 12,
  },
  s11: {
    cost: 15,
    p3: 35,
    p4: 12
  },
  s12: {
    cost: 15,
    p1: 7,
    p2: 7,
    p3: 7,
    p4: 48
  }
};

const integers = [
  ...Object.keys(variables)
];

const result = solve({
  direction: "minimize",
  objective: "cost",
  constraints,
  variables,
  integers,
});

console.log(result);
