import {solve, greaterEq, lessEq} from "yalps";

const shopApMultiplier = 4;
const dailyGain = {
  // p4: 40+40+40+50+50+40+50+50
  cost: (
    24*60/6+
    150+
    200/7+
    25.15*24 +
    90*shopApMultiplier +
    - 20*3 - 15*6
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
const endDate = new Date("2023-10-10T09:59");
const daysLeft = Math.floor((endDate - Date.now()) / (1000 * 60 * 60 * 24));

const current = {
  p1: 1587,
  p2: 1583,
  p3: 0,
  p4: 2456
}

const shop = {
  p1: (
    3*10+18*30+12*100+4*300+
    45*5+22*15+12*50+6*200+
    45*5+22*15+12*50+6*200+
    1000+2000+2000
  ),
  p2: (
    50*5+38*15+25*50+15*200+
    45*5+22*15+12*50+6*200+
    45*5+22*15+12*50+6*200+
    500*2+2000
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
    p1: 6+8,
    p2: 6+8,
    p4: 21+26
  },
  s10: {
    cost: 20,
    p1: 21+26,
    p4: 12+15
  },
  s11: {
    cost: 20,
    p2: 21+27,
    p4: 12+15
  },
  s12: {
    cost: 20,
    p4: 30+36
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
      dailyGain.cost * dailyMultiplier * daysLeft
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
