import {solve, greaterEq, lessEq} from "yalps";

const specialStage = {
  p1: 40,
  p2: 35,
  p3: 30,
  p4: 120
};

const specialEachDay = 8;
const daysLeft = 10;

const constraints = {
  p1: greaterEq(
    50*25
    + 400+200*10+100*40+20*200
    + 50*8+35*14+25*29+10*72
    + 50*7+35*12+25*24+10*60
    + 2000
    - 6298
    - specialStage.p1 * specialEachDay * daysLeft
),
  p2: greaterEq(
    50*20
    + 40*25+30*50+25*120+8*240
    + 20*20+15*40+12*100+4*200
    + 20*20+15*40+12*100+4*200
    + 1500
    - 5181
    - specialStage.p2 * specialEachDay * daysLeft
  ),
  p3: greaterEq(
    100*5+40*25+20*100+5*500
    + 4*150+60*12+30*30+15*60
    + 12*25+8*50
    + 8*50
    - 4505
    - specialStage.p3 * specialEachDay * daysLeft
  ),
  p4: greaterEq(
    10000
    - 9179
    - specialStage.p4 * specialEachDay * daysLeft
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
