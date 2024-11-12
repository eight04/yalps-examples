import {solve, greaterEq, lessEq} from "yalps";

const apFromShop = 90 * 0;
const apFromDiamonds = 120 * 0;
const apToSchoolExchange = 15 * 3;
const apToHard = 20 * 3 * 1;
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

const dailyMultiplier = 1;
const endDate = new Date("2024-11-19T09:59+08:00");
const daysLeft = Math.floor((endDate - Date.now()) / (1000 * 60 * 60 * 24));

// FIXME: we sum dailyConstraint into dailyConstraint * daysLeft
// which is wrong, the constraint has to be met every day
const dailyConstraint = {
  p1: 0 / daysLeft,
  p2: 0 / daysLeft,
  p3: 0 / daysLeft,
  p4: 0 / daysLeft,
};

const current = {
  p1: 2172,
  p2: 1488,
  p3: 1504,
  p4: 0
};

const shop = {
  p1: (0
  ),
  p2: ( 0
    +3*300
    +70*5+10*200
    +1000+300
  ),
  p3: ( 0
    +70*5+10*200
    +1000+300
  ),
  p4: 4*5+20*2+20
}

const bonus = {
  p1: 25+25+15+15+15+15,
  p2: 20+20+15+15+20+15,
  p3: 15+15+15+15+20+15,
  p4: 0,
};

console.log("bonus:", bonus);

const stages = {
  p2toP3: {
    p2: -5,
    p3: 1
  },
  // t4: {
  //   p3: -5,
  //   p4: 1
  // },
  s1: {
    cost: 10,
    ...p(12,3,3)
  },
  s2: {
    cost: 10,
    ...p(0,14,4)
  },
  s3: {
    cost: 10,
    ...p(0,4,14)
  },
  s4: {
    cost: 10,
    ...p(18,0,0)
  },
  s5: {
    cost: 15,
    ...p(19,4,4)
  },
  s6: {
    cost: 15,
    ...p(0,23,4)
  },
  s7: {
    cost: 15,
    ...p(0,4,23)
  },
  s8: {
    cost: 15,
    ...p(27,0,0)
  },
  s9: {
    cost: 20,
    ...p(28,4,4)
  },
  s10: {
    cost: 20,
    ...p(4,32,0)
  },
  s11: {
    cost: 20,
    ...p(4,0,32)
  },
  s12: {
    cost: 20,
    ...p(36,0,0)
  },
  sHard: {
    cost: 60,
    hard: 1
  },
  p1toP4: {
    p1: 184-3784,
    p4: 36
  }
};

applyBonus(stages, bonus);

for (const key in stages) {
  if (!stages[key].cost) continue;
  stages[key].length = sum([1, 2, 3, 4].map(i => stages[key][`p${i}`] || 0)) / stages[key].cost;
}

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

console.log(`daysLeft: ${daysLeft}`);
// start({daysLeft, goal: {max: "p1"}});
start({daysLeft, goal: {max: "hard"}});

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
    cost: lessEq(
      dailyGain.cost * dailyMultiplier * (daysLeft + 1)
    ),
  };

  for (let i = 0; i < 4; i++) {
    const key = `p${i + 1}`;
    constraints[key] = greaterEq(
      Math.max( dailyConstraint[key] * daysLeft || 0, shop[key])
      - (current[key] || 0)
      - (dailyGain[key] || 0) * dailyMultiplier * daysLeft
    );
  }

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

  // if (Object.values(dailyConstraint).some(v => v > 0)) {
  //   result.variablesForEachDay = result.variables.map(v => [v[0], v[1] / daysLeft]);
  // }
  const hard = result.variables.find(v => v[0] === "sHard")?.[1];
  if (hard) {
    result.hardPerDay = hard / daysLeft;
  }

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
