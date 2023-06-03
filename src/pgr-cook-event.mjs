import {solve, greaterEq, lessEq} from "yalps";

const sources = {
  vegetable: 5,
  meat: 5,
  rice: 4 + 10/60,
  egg: 2,
  fish: 6
};

const dishes = {
  陽春麵: {
    coin: 38,
    cook: 3 + 20 / 60,
    sell: 5,
    use: {
      rice: 2
    }
  },
  菜心: {
    coin: 30,
    cook: 3 + 20 / 60,
    sell: 5,
    use: {
      vegetable: 2
    }
  },
  叉燒: {
    coin: 30,
    cook: 5,
    sell: 3 + 20 / 60,
    use: {
      meat: 2
    }
  },
  東坡肉: {
    coin: 63,
    cook: 10,
    sell: 5,
    use: {
      meat: 2,
      vegetable: 1
    }
  },
  湯圓: {
    coin: 70,
    cook: 10,
    sell: 5,
    use: {
      rice: 1,
      egg: 2
    }
  },
  春卷: {
    coin: 27,
    cook: 6,
    sell: 3,
    use: {
      vegetable: 1,
      egg: 2
    }
  },
  蛋羹: {
    coin: 65,
    cook: 12,
    sell: 5,
    use: {
      egg: 2,
      vegetable: 1
    }
  },
  魚湯: {
    coin: 264,
    cook: 25,
    sell: 12,
    use: {
      fish: 2,
      vegetable: 2
    }
  },
  獅子頭: {
    coin: 150,
    cook: 20,
    sell: 10,
    use: {
      meat: 2,
      rice: 2
    }
  },
  蟹粥: {
    coin: 150,
    cook: 20,
    sell: 10,
    use: {
      fish: 2,
      rice: 2
    }
  },
  白扒四寶: {
    coin: 497,
    cook: 12,
    sell: 5,
    use: {
      fish: 3,
      meat: 2,
      vegetable: 1
    }
  },
  松鼠: {
    coin: 434,
    cook: 20,
    sell: 15,
    use: {
      fish: 3,
      rice: 3
    }
  },
  蝦餃: {
    coin: 260,
    cook: 12,
    sell: 6,
    use: {
      fish: 2,
      egg: 2,
      rice: 2
    }
  },
}

const constraints = {
  prepare: lessEq(5),
  cook: lessEq(5),
  sell: lessEq(3),
};

for (const key in sources) {
  constraints[key] = greaterEq(0);
}
for (const key in dishes) {
  constraints[key] = greaterEq(0);
}

const variables = {};
for (const [key, value] of Object.entries(sources)) {
  variables[key] = {
    prepare: 1,
    [key]: 1 / value
  };
}
for (const [key, value] of Object.entries(dishes)) {
  variables[key] = {
    cook: 1,
    [key]: 1 / value.cook
  };
  for (const [k, v] of Object.entries(value.use)) {
    variables[key][k] = -v / value.cook;
  };

  variables[`賣${key}`] = {
    sell: 1,
    [key]: -1 / value.sell,
    coin: value.coin / value.sell
  };
}

const integers = [
  ...Object.keys(variables),
];

const result = solve({
  direction: "maximize",
  objective: "coin",
  constraints,
  variables,
  // integers,
});

console.log(result);
