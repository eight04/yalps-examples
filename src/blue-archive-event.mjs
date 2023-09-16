import {solve, greaterEq, lessEq} from "yalps";

const dailyGain = {
  // p4: 40+40+40+50+50+40+50+50
};

// FIXME: we sum dailyConstraint into dailyConstraint * daysLeft
// which is wrong, the constraint has to be met every day
const dailyConstraint = {
  // p1: 300,
  // p2: 260,
  // p3: 210,
};

const dailyMultiplier = 1;
const endDate = new Date("2023-09-19T09:59");
const daysLeft = Math.floor((endDate - Date.now()) / (1000 * 60 * 60 * 24));

const current = {
  p1: 3238,
  p2: 5770,
  p3: 10750,
  p4: 14577
}

const shop = {
  p1: 10*40+30*15+20*30+10*60,
  p2: (
    35*20+30*40+25*100+7*200
  ),
  p3: (
    5*150+60*15+30*50+15*150 +
    5*150+60*15+30*50+15*150
  ),
  p4: (
    15000
  )
}

const stages = {
  s9: {
    cost: 20,
    p1: 40+48,
    p4: 8+10
  },
  s10: {
    cost: 20,
    p2: 32+39,
    p4: 18
  },
  s11: {
    cost: 20,
    p3: 27+33,
    p4: 18
  },
  s12: {
    cost: 20,
    p1: 6+8,
    p2: 6+8,
    p3: 6+8,
    p4: 32+39
  }
};

console.log(`daysLeft: ${daysLeft}`);
start({daysLeft});

// console.log(`daysLeft: ${daysLeft + 1}`);
// start({daysLeft: daysLeft + 1});


function start({daysLeft}) {
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
    )
  };
  console.log(constraints)

  const integers = [
    ...Object.keys(stages)
  ];

  const result = solve({
    direction: "minimize",
    objective: "cost",
    constraints,
    variables: stages,
    integers,
  });

  console.log(result);

}
