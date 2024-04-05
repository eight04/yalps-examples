import {solve, greaterEq, lessEq} from "yalps";

const apFromShop = 90 * 1;
const apFromDiamonds = 120 * 0;
const apToSchoolExchange = 15 * 6;
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
const endDate = new Date("2024-04-16T09:59+08:00");
const daysLeft = Math.floor((endDate - Date.now()) / (1000 * 60 * 60 * 24));

// FIXME: we sum dailyConstraint into dailyConstraint * daysLeft
// which is wrong, the constraint has to be met every day
const dailyConstraint = {
  p1: 15000 / daysLeft,
  p2: 7500 / daysLeft,
  p3: 7500 / daysLeft,
  p4: 7500 / daysLeft,
};

const current = {
  p1: 13310,
  p2: 1121,
  p3: 1966,
  p4: 2667
};

const shop = {
  p1: (0
  ),
  p2: ( 0
    +150*1+75*5+35*20+15*100
    +15*30+10*100+3*300
    +300+1000
  ),
  p3: ( 0
    +300
  ),
  p4: ( 0
    +1000
    +5*100+40*25
    +10*200+20*50+10*200
  )
}

const bonus = {
  p1: 15*6,
  p2: 15*6,
  p3: 15*5,
  p4: 25+15*3+30,
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
    ...p(3, 9, 3, 3)
  },
  s2: {
    cost: 10,
    ...p(3, 3, 9, 3)
  },
  s3: {
    cost: 10,
    ...p(3, 3, 3, 9)
  },
  s4: {
    cost: 10,
    ...p(18, 0, 0, 0)
  },
  s5: {
    cost: 15,
    ...p(4, 18, 5, 0)
  },
  s6: {
    cost: 15,
    ...p(4, 0, 18, 5)
  },
  s7: {
    cost: 15,
    ...p(4, 5, 0, 18)
  },
  s8: {
    cost: 15,
    ...p(27, 0, 0, 0)
  },
  s9: {
    cost: 20,
    ...p(6, 30, 0, 0)
  },
  s10: {
    cost: 20,
    ...p(6, 0, 30, 0)
  },
  s11: {
    cost: 20,
    ...p(6, 0, 0, 30)
  },
  s12: {
    cost: 20,
    ...p(36, 0, 0, 0)
  },
};

applyBonus(stages, bonus);

// for (const key in stages) {
//   stages[key].length = sum([1, 2, 3, 4].map(i => stages[key][`p${i}`] || 0)) / stages[key].cost;
// }

function sum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

console.log(`daysLeft: ${daysLeft}`);
start({daysLeft, goal: {min: "cost"}});

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
