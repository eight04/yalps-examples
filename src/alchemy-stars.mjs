import {solve, greaterEq, lessEq} from "yalps";

// 結論︰
// 紫屬性材料 - 合成 > 主線 >>> 黑市
// 藍屬性材料 - 黑市 > 合成
// 綠屬性材料 - 8折黑市 > 合成
// 白屬性材料 - 靈質副產物  (黑市5折可買，用來合成)
// 經驗 - 黑市 > 經驗本

const soldOut = [
  "exp",
  "blueElement",
  "greenElement",
  // "whiteElement"
];

const constraints = {
  // https://nga.178.com/read.php?tid=27395803&rand=903
  exp: {min: 145250},
  coin: {min: 1108800},
  spirit: {min: 6500},
  greenElement: {min: 50},
  blueElement: {min: 50},
  purpleElement: {min: 20},
  greenGroup: {min: 25},
  blueGroup: {min: 30},
  purpleGroup: {min: 35},
  whiteElement: {min: 30},
};

const stages = {
  q10: {
    // FIXME: is this true
    // https://forum.gamer.com.tw/C.php?bsn=70664&snA=2094
    ap: 27,
    purpleElement: 1/3,
    purpleGroup: 1.2,
    blueElement: 3,
    blueGroup: 2,
    exp: 8.9*100,
    greenElement: 2,
    greenGroup: 0.5,
    coin: 6400,
  },
  sPurpleElement: {
    purpleElement: 1,
    coin: -30000,
  },
  sPurpleGroup: {
    purpleGroup: 1,
    coin: -15000,
  },
  sBlueElement: {
    blueElement: 1,
    coin: -12000,
  },
  sBlueGroup: {
    blueGroup: 1,
    coin: -8000,
  },
  sGreenElement: {
    greenElement: 1,
    coin: -5000,
  },
  sGreenGroup: {
    greenGroup: 1,
    coin: -2500,
  },
  sWhiteElement: {
    whiteElement: 1,
    coin: -2000,
  },
  sExp: {
    exp: 150,
    coin: -1000,
  },
  qExp: {
    exp: 7*750+10*150,
    ap: 30
  },
  qCoin: {
    coin: 90000,
    ap: 30
  },
  qEquipment: {
    purpleGroup: 3,
    blueGroup: 2,
    spirit: 300,
    greenElement: 3,
    greenGroup: 2,
    whiteElement: 10,
    ap: 30
  },
  tPurpleElement: {
    purpleElement: 1,
    blueElemnt: -4,
  },
  tBlueElement: {
    blueElement: 1,
    greenElement: -4,
  },
  tGreenElement: {
    greenElement: 1,
    whiteElement: -4,
  },
};

for (const item of soldOut) {
  delete stages[`s${item[0].toUpperCase()}${item.slice(1)}`];
}

const priceOff = 0.5;
for (const key in stages) {
  if (key.startsWith("s")) {
    stages[key].coin *= priceOff;
  }
}

start({goal: {min: "ap"}});

function start({daysLeft, goal}) {
  const model = {
    direction: goal.max ? "maximize" : "minimize",
    objective: goal.max || goal.min || "ap",
    constraints,
    variables: stages,
  };
  console.log(model)
  const result = solve(model);

  console.log(result);

}
