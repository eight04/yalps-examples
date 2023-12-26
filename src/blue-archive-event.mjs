import {solve, greaterEq, lessEq} from "yalps";

const apFromShop = 90 * 4;
const apFromDiamonds = 0;
const apToSchoolExchange = 15 * 3;
const dailyGain = {
  // p4: 40+40+40+50+50+40+50+50
  cost: (
    24*60/6+
    150+
    200/7+
    25.15*24 +
    apFromDiamonds +
    apFromShop +
    - 20*3 // hard main
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
const endDate = new Date("2024-01-09T09:59+08:00");
const daysLeft = Math.floor((endDate - Date.now()) / (1000 * 60 * 60 * 24));

const current = {
  p1: 0,
  p2: 0,
  p3: 0,
  p4: 0
}

const shop = {
  p1: (
    0
  ),
  p2: (
    1000
  ),
  p3: (
    300*7 +
    1000
  ),
  p4: (
    30*50+15*100+
    15*100+
    1000
  )
}

const bonus = {
  p1: 25+15+15+15+25,
  p2: 25+15+15+15+15+15,
  p3: 15+15+15+15+25+15,
  p4: 15+15+15   +15
};

console.log("bonus:", bonus);

const stages = {
  s1: {
    cost: 10,
    p1: 6,
    p2: 6,
    p3: 6,
  },
  s2: {
    cost: 10,
    p1: 6,
    p3: 6,
    p4: 6
  },
  s3: {
    cost: 10,
    p1: 6,
    p2: 6,
    p4: 6,
  },
  s4: {
    cost: 10,
    p1: 12,
    p2: 2,
    p3: 2,
    p4: 2,
  },
  s5: {
    cost: 15,
    p1: 9,
    p2: 12,
    p3: 6,
  },
  s6: {
    cost: 15,
    p1: 9,
    p3: 12,
    p4: 6
  },
  s7: {
    cost: 15,
    p1: 9,
    p2: 6,
    p4: 12,
  },
  s8: {
    cost: 15,
    p1: 21,
    p2: 2,
    p3: 2,
    p4: 2,
  },
  s9: {
    cost: 20,
    p2: 36,
  },
  s10: {
    cost: 20,
    p3: 36,
  },
  s11: {
    cost: 20,
    p4: 36,
  },
  s12: {
    cost: 20,
    p1: 36,
  }
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
        stage[key] += Math.ceil(stage[key] * (value + 100) / 100);
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
