import {solve, greaterEq, lessEq} from "yalps";

const EVENT_END = new Date("2023-12-29T23:59:59+08:00");
const MINUTES_LEFT = Math.floor((EVENT_END - new Date()) / 1000 / 60);

const sources = {
  // minutes required by each sources
  fruit: 4,
  egg: 3 + 20/60,
  drink: 3,
  rice: 3 + 20/60,
  spice: 3
};

const currentSources = {
  fruit: 146,
  egg: 634,
  drink: 197,
  rice: 395,
  spice: 152
};

const dishes = {
  檸七: {
    coin: 24,
    cook: 4,
    sell: 4,
    current: 2,
    use: {
      fruit: 1,
      foo: 123,
    }
  },
  西瓜汁: {
    coin: 23,
    cook: 3 + 20/60,
    sell: 3 + 20/60,
    current: 5,
    use: {
      fruit: 1
    }
  },
  冰牛奶: {
    coin: 30,
    cook: 3 + 30/60,
    sell: 3 + 20/60,
    current: 1,
    use: {
      egg: 2
    }
  },
  港式奶茶: {
    coin: 33,
    cook: 3 + 30/60,
    sell: 3 + 20/60,
    current: 0,
    use: {
      egg: 1,
      drink: 1
    }
  },
  綠豆沙: {
    coin: 47,
    sell: 3 + 20/60,
    cook: 7 + 20/60,
    current: 0,
    use: {
      rice: 3,
    }
  },
  水果豆花: {
    coin: 55,
    cook: 8,
    sell: 4,
    current: 0,
    use: {
      rice: 2,
      fruit: 1,
    }
  },
  美式咖啡: {
    coin: 61,
    cook: 9,
    sell: 6,
    current: 0,
    use: {
      drink: 3,
    }
  },
  鹼水麵包: {
    coin: 73,
    cook: 10 + 40/60,
    sell: 6 + 40/60,
    current: 277,
    use: {
      rice: 2,
      spice: 1
    }
  },
  澳瑞白: {
    coin: 75,
    cook: 8,
    sell: 6 + 40/60,
    current: 832,
    use: {
      egg: 1,
      drink: 2
    }
  },
  芒果綿綿冰: {
    coin: 173/1.2,
    cook: 16,
    sell: 10,
    current: 9,
    use: {
      fruit: 2,
      rice: 1,
      spice: 1
    }
  },
  奶油泡芙: {
    coin: 132,
    cook: 12,
    sell: 11,
    current: 32,
    use: {
      egg: 2,
      rice: 1,
      spice: 1
    }
  },
  抹茶紅豆冰: {
    coin: 159/1.2,
    cook: 13 + 20/60,
    sell: 10,
    current: 414,
    use: {
      drink: 2,
      rice: 1,
      spice: 1
    }
  },
  楓糖鬆餅: {
    coin: 150,
    cook: 16,
    sell: 10,
    current: 8,
    use: {
      egg: 3,
      rice: 1,
      spice: 1
    }
  },
  甜蜜暴擊泡芙: {
    coin: 188,
    cook: 12,
    sell: 10,
    current: 242,
    use: {
      fruit: 2,
      egg: 1,
      drink: 1,
      spice: 1,
    }
  },
  陽光莓莓鬆餅: {
    coin: 200,
    cook: 13 + 20/60,
    sell: 11,
    current: 188,
    use: {
      fruit: 1,
      egg: 2,
      rice: 1,
      spice: 1,
    }
  },
  鯊碧汽水: {
    coin: 195,
    cook: 15,
    sell: 10,
    current: 0,
    use: {
      drink: 4,
      spice: 1,
    }
  },
  草莓百匯: {
    coin: 282/1.25,
    cook: 12 + 1/2,
    sell: 10,
    current: 159,
    use: {
      fruit: 1,
      egg: 1,
      rice: 2,
      spice: 1,
    }
  },
  豪華百匯杯: {
    coin: 280,
    cook: 12 + 1/2,
    sell: 10,
    current: 175,
    use: {
      fruit: 2,
      egg: 2,
      drink: 1,
      spice: 1,
    }
  }
}

const constraints = {
  prepare: lessEq(6),
  cook: lessEq(6),
  sell: lessEq(4),
};

const hot = [
  "鯊碧汽水",
  "楓糖鬆餅",
  "芒果綿綿冰",
  "美式咖啡",
  "綠豆沙",
  "冰牛奶",
  "檸七",
];

const hotMultiplier = 1.25;

for (const key of hot) {
  dishes[key].coin = Math.ceil(dishes[key].coin * hotMultiplier);
}

for (const key in sources) {
  constraints[key] = greaterEq(-(currentSources[key] / MINUTES_LEFT));
}
for (const key in dishes) {
  constraints[key] = greaterEq(-(dishes[key].current / MINUTES_LEFT));
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
    [key]: 1 / value.cook,
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
