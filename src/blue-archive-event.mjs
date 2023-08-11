import {solve, greaterEq, lessEq} from "yalps";

const dailyGain = {
  p1: 0,
  p2: 0,
  p3: 0,
  p4: 40+40+40+50+50+40+50+50
};

const dailyMultiplier = 1;
const daysLeft = 0;

const constraints = {
  p1: greaterEq(
    50*25
    + 300+1500+2800+3000
    + 75*7+50*12+35*24+15*60
    + 2000
    - 1688
    - dailyGain.p1 * dailyMultiplier * daysLeft
),
  p2: greaterEq(
    50*20
    + 45*20+32*40+24*100+8*200
    + 2000
    - 1202
    - dailyGain.p2 * dailyMultiplier * daysLeft
  ),
  p3: greaterEq(
    1000
    + 100*5+40*25
    + 150*3+60*10+30*25+15*50
    + 150*3+60*10+30*25+15*50
    + 500
    - 1030
    - dailyGain.p3 * dailyMultiplier * daysLeft
  ),
  p4: greaterEq(
    15000
    - 1514
    - dailyGain.p4 * dailyMultiplier * daysLeft
  )
};

const variables = {
  s9: {
    cost: 20,
    p1: 34+41,
    p4: 15+17
  },
  s10: {
    cost: 20,
    p2: 29+29,
    p4: 15+17,
  },
  s11: {
    cost: 20,
    p3: 24+22,
    p4: 15+17
  },
  s12: {
    cost: 20,
    p1: 12+15,
    p2: 11+11,
    p3: 10+9,
    p4: 15+17
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
