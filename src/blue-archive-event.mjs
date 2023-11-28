import {solve, greaterEq, lessEq} from "yalps";

const apFromShopTimes = 1;
const dailyGain = {
  // p4: 40+40+40+50+50+40+50+50
  cost: (
    24*60/6+
    150+
    200/7+
    25.15*24 +
    90*apFromShopTimes +
    - 20*3 // hard main
    - 15*6 // 學園交流會
  )
};

// FIXME: we sum dailyConstraint into dailyConstraint * daysLeft
// which is wrong, the constraint has to be met every day
const dailyConstraint = {
  // p1: 300,
  // p2: 260,
  // p3: 210,
};

const dailyMultiplier = 1;
const endDate = new Date("2023-12-12T09:59+08:00");
const daysLeft = Math.floor((endDate - Date.now()) / (1000 * 60 * 60 * 24));

const current = {
  p1: 1568,
  p2: 1581,
  p3: 0,
  p4: 15451
}

const shop = {
  p1: (
    15*30+10*100+3*300+
    70*5+35*15+20*50+10*200+
    10*200+10*200+300+
    1000
  ),
  p2: (
    12*200+
    70*5+35*15+20*50+10*200+
    10*200+10*200+300+
    1000
  ),
  p3: (
    0
  ),
  p4: (
    0
  )
}

const stages = {
  s9: {
    cost: 20,
    p1: 4+4,
    p2: 4+4,
    p4: 28+26
  },
  s10: {
    cost: 20,
    p1: 32+32,
    p4: 4+4
  },
  s11: {
    cost: 20,
    p2: 32+31,
    p4: 4+4
  },
  s12: {
    cost: 20,
    p4: 36+33
  }
};

console.log(`daysLeft: ${daysLeft}`);
start({daysLeft, goal: {max: "p4"}});

// console.log(`daysLeft: ${daysLeft + 1}`);
// start({daysLeft: daysLeft + 1});


function start({daysLeft, goal}) {
  const constraints = {
    p1: greaterEq(
      Math.max(
        dailyConstraint.p1 * daysLeft || 0,
        shop.p1
        - current.p1
        - (dailyGain.p1 || 0) * dailyMultiplier * daysLeft
      )
    ),
    p2: greaterEq(
      Math.max(
        dailyConstraint.p2 * daysLeft || 0,
        shop.p2
        - current.p2
        - (dailyGain.p2 || 0) * dailyMultiplier * daysLeft
      )
    ),
    p3: greaterEq(
      Math.max(
        dailyConstraint.p3 * daysLeft || 0,
        shop.p3
        - current.p3
        - (dailyGain.p3 || 0) * dailyMultiplier * daysLeft
      )
    ),
    p4: greaterEq(
      Math.max(
        dailyConstraint.p4 * daysLeft || 0,
        shop.p4
        - current.p4
        - (dailyGain.p4 || 0) * dailyMultiplier * daysLeft
      )
    ),
    cost: lessEq(
      dailyGain.cost * dailyMultiplier * (daysLeft + 1)
    ),
  };
  console.log(constraints)

  const integers = [
    ...Object.keys(stages)
  ];

  const result = solve({
    direction: goal.max ? "maximize" : "minimize",
    objective: goal.max || goal.min || "cost",
    constraints,
    variables: stages,
    integers,
  });

  console.log(result);

}
