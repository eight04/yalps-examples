import {solve, greaterEq, lessEq} from "yalps";

const apFromShop = 90 * 0;
const apFromDiamonds = 120 * 0;
const apToSchoolExchange = 15 * 3;
const apToHard = 20 * 3;
const dailyGain = {
  // p4: 40+40+40+50+50+40+50+50
  cost: (
    24*60/6+
    150+
    200/7+
    25.15*24 +
    apFromDiamonds +
    apFromShop +
    - apToHard // hard main
    - apToSchoolExchange // 學園交流會
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
const endDate = new Date("2024-03-12T09:59+08:00");
const daysLeft = Math.floor((endDate - Date.now()) / (1000 * 60 * 60 * 24));

const current = {
  p1: 2151,
  p2: 1496,
  p3: 1479,
  p4: 0
};

const shop = {
  p1: (
    0
  ),
  p2: (
    3*300+10*200+1000+300
  ),
  p3: (
    12*200+10*200+1000+300
  ),
  p4: (
    0
  )
}

const bonus = {
  p1: 15*4+15*2,
  p2: 20+15+15+30,
  p3: 20+15*3+30,
  p4: 0,
};

console.log("bonus:", bonus);

const stages = {
  t1: {
    cost: 0,
    p2: -5,
    p3: 1
  },
  s1: {
    cost: 10,
    p1: 10,
    p2: 3,
    p3: 3,
  },
  s2: {
    cost: 10,
    p2: 13,
    p3: 3,
  },
  s3: {
    cost: 10,
    p2: 3,
    p3: 13,
  },
  s4: {
    cost: 10,
    p1: 16,
  },
  s5: {
    cost: 15,
    p1: 16,
    p2: 4,
    p3: 4,
  },
  s6: {
    cost: 15,
    p2: 20,
    p3: 4,
  },
  s7: {
    cost: 15,
    p2: 4,
    p3: 20,
  },
  s8: {
    cost: 15,
    p1: 24,
  },
  s9: {
    cost: 20,
    p1: 24,
    p2: 4,
    p3: 4,
  },
  s10: {
    cost: 20,
    p1: 4,
    p2: 28
  },
  s11: {
    cost: 20,
    p1: 4,
    p3: 28,
  },
  s12: {
    cost: 20,
    p1: 32,
  },
};

applyBonus(stages, bonus);

console.log(`daysLeft: ${daysLeft}`);
start({daysLeft, goal: {max: "p1"}});

// console.log(`daysLeft: ${daysLeft + 1}`);
// start({daysLeft: daysLeft + 1});

function applyBonus(stages, bonus) {
  for (const stage of Object.values(stages)) {
    for (const [key, value] of Object.entries(bonus)) {
      if (stage[key]) {
        stage[key] += Math.ceil(stage[key] * value / 100);
      }
    }
  }
}

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
        - (current.p2 || 0)
        - (dailyGain.p2 || 0) * dailyMultiplier * daysLeft
      )
    ),
    p3: greaterEq(
      Math.max(
        dailyConstraint.p3 * daysLeft || 0,
        shop.p3
        - (current.p3 || 0)
        - (dailyGain.p3 || 0) * dailyMultiplier * daysLeft
      )
    ),
    p4: greaterEq(
      Math.max(
        dailyConstraint.p4 * daysLeft || 0,
        shop.p4
        - (current.p4 || 0)
        - (dailyGain.p4 || 0) * dailyMultiplier * daysLeft
      )
    ),
    cost: lessEq(
      dailyGain.cost * dailyMultiplier * (daysLeft + 1)
    ),
  };
  console.log('C', constraints)
  console.log('stage', stages)

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
