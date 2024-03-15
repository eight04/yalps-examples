import {solve, greaterEq, lessEq} from "yalps";

const apFromShop = 90 * 0;
const apFromDiamonds = 120 * 0;
const apToSchoolExchange = 15 * 3;
const apToHard = 20 * 3 * 4;
const dailyGain = {
  // p4: 40+40+40+50+50+40+50+50
  cost: Math.floor(
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
const endDate = new Date("2024-03-21T09:59+08:00");
const daysLeft = Math.floor((endDate - Date.now()) / (1000 * 60 * 60 * 24));

const current = {
  p1: 4538,
  p2: 1730,
  p3: 1533,
  p4: 1403
};

const shop = {
  p1: (
    15000
  ),
  p2: (
    50*25+24*20+10*60+1000+600
  ),
  p3: (
    25*100+7*200+1000+600
  ),
  p4: (
    50*16+15*50+1000+600
  )
}

const bonus = {
  p1: 20*3+40,
  p2: 60+40,
  p3: 60+40,
  p4: 30*3+10,
};

console.log("bonus:", bonus);

const stages = {
  t3: {
    p2: -5,
    p3: 1
  },
  t4: {
    p3: -5,
    p4: 1
  },
  s1: {
    cost: 10,
    ...p(4, 6, 2, 0)
  },
  s2: {
    cost: 10,
    ...p(4, 0, 5, 2)
  },
  s3: {
    cost: 10,
    ...p(4, 2, 0, 5)
  },
  // s4: {
  //   cost: 10,
  //   ...p(16, 1, 1, 1)
  // },
  s5: {
    cost: 15,
    ...p(6, 20, 0, 0)
  },
  s6: {
    cost: 15,
    ...p(6, 0, 17, 0)
  },
  s7: {
    cost: 15,
    ...p(6, 0, 0, 15)
  },
  // s8: {
  //   cost: 15,
  //   ...p(24, 3, 3, 3)
  // },
  s9: {
    cost: 20,
    ...p(8, 40, 0, 0)
  },
  s10: {
    cost: 20,
    ...p(8, 0, 32, 0)
  },
  s11: {
    cost: 20,
    ...p(8, 0, 0, 27)
  },
  s12: {
    cost: 20,
    ...p(32, 6, 6, 6)
  },
};

applyBonus(stages, bonus);

console.log(`daysLeft: ${daysLeft}`);
start({daysLeft, goal: {max: "p1"}});

// console.log(`daysLeft: ${daysLeft + 1}`);
// start({daysLeft: daysLeft + 1});

function applyBonus(stages, bonus) {
  for (const [stageName, stage] of Object.entries(stages)) {
    if (!stageName.startsWith("s")) continue;
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

  const integers = [
    // https://github.com/Ivordir/YALPS/issues/3
    // ...Object.keys(stages)
  ];

  const model = {
    direction: goal.max ? "maximize" : "minimize",
    objective: goal.max || goal.min || "cost",
    constraints,
    variables: stages,
    integers,
  };
  console.log(model)
  const result = solve(model);

  console.log(result);

}

function p(...args) {
  const o = {};
  let i = 1;
  for (const arg of args) {
    o[`p${i}`] = arg;
    i++;
  }
  return o;
}
