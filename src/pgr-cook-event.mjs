import {solve, greaterEq, lessEq} from "yalps";

const sources = {
  // minutes required by each sources
  fruit: 4,
  egg: 3 + 20/60,
  drink: 3,
  rice: 3 + 20/60,
  spice: 3
};

const dishes = {
  檸七: {
    coin: 27,
    cook: 4,
    sell: 4,
    use: {
      fruit: 1
    }
  },
  西瓜汁: {
    coin: 26,
    cook: 3 + 20/60,
    sell: 3 + 20/60,
    use: {
      fruit: 1
    }
  },
  冰牛奶: {
    coin: 33,
    cook: 3 + 30/60,
    sell: 3 + 20/60,
    use: {
      egg: 2
    }
  },
}

const constraints = {
  prepare: lessEq(2),
  cook: lessEq(1),
  sell: lessEq(1),
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
