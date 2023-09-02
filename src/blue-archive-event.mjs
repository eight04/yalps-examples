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
const endDate = new Date("2023-09-05T09:59");
const daysLeft = Math.floor((endDate - Date.now()) / (1000 * 60 * 60 * 24));

const current = {
  p1: 11490,
  p2: 7439,
  p3: 8565,
}

const shop = {
  p1:
    25*50
    + 100*3+40*10+20*25+5*50
    + 500+100*10+25*40+10*200
    + 50*7+35*12+25*24+10*60
    + 50*7+35*12+25*24+10*60
    + 2000,
  p2: (
    50*25
    + 100*3+40*10+20*2+5*50
    + 20*20+15*40+12*100+4*200
    + 20*20+15*40+12*100+4*200
  ),
  p3: (
    50*25
    + 100*3+40*10+20*25+5*50
    + 100*5+40*25+20*100+5*500
  ),
}

const stages = {
  controlAlpha: {
    cost: 20,
    p1: 40+48,
  },
  recordDelta: {
    cost: 20,
    p1: 5+6,
    p2: 5+6,
    p3: 30+36
  },
  recordBeta: {
    cost: 20,
    p1: 5+6,
    p2: 30+36,
    p3: 5+6
  },
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
    // p4: greaterEq(
    //   Math.max(
    //     dailyConstraint.p4 * daysLeft || 0,
    //     shop.p4
    //     - current.p4
    //     - (dailyGain.p4 || 0) * dailyMultiplier * daysLeft
    //   )
    // )
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
