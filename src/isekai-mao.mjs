/**
 * This is not a yalps but a gacha simulator for Isekai Mao
 **/
const COST = 270;
const MAX_TEST = 100000;
const IS_DRAGON = true;
const COUNT_ALL_SR = true;
const START_PULL_FROM = 1;
const UNTIL_NEXT_PITY = 120;
const HAS_ROAD = true;

const PU_RATE = IS_DRAGON ? 1.1 : 1.5;
const MAX_PITY = IS_DRAGON ? 120 : 80;

const pool = [
  { rate: PU_RATE, gain: 1, resetPity: true, },
  { rate: 6 - PU_RATE, gain: 1 * COUNT_ALL_SR, },
  { rate: 0.2, gain: 6 * COUNT_ALL_SR, },
  { rate: 0.1, cost: -20000, },
  { rate: 5, cost: -200, },
  { rate: 8, cost: -150, },
  { rate: 12, cost: -100, },
  { rate: 12.1, gain: 1 / 8 * COUNT_ALL_SR, }
];

const PU_ROAD = [
  { n: 30, cost: -2000, },
  { n: 65, cost: -5 * COST, },
  { n: 95, cost: -5 * COST, },
  { n: 130, cost: -10 * COST, },
  { n: 160, cost: -2000, },
  { n: 210, cost: -10 * COST, },
  { n: 250, cost: -3000, },
  { n: 310, cost: -10 * COST, },
  { n: 415, cost: -15 * COST, },
  { n: 515, cost: -15 * COST, },
  { n: 620, cost: -20 * COST, },
]

const road = HAS_ROAD ? PU_ROAD : [];

const result = new Map(road.map(r => [r.n, {gain: 0, cost: 0, times: 0}]));
const pityResult = {gain: 0, cost: 0};

const NONE = {};

function pull() {
  let n = Math.random() * 100;
  let rateN = 0.0;
  for (const r of pool) {
    rateN += r.rate;
    if (n < rateN) {
      return r;
    }
  }
  return NONE;
}

function gacha() {
  const MAX_PULL = road[road.length - 1]?.n ?? MAX_PITY;
  let roadIndex = road.findIndex(r => r.n >= START_PULL_FROM);
  let pity = MAX_PITY - UNTIL_NEXT_PITY;
  let gain = 0.0;
  let cost = 0;
  let firstPity = true;
  for (let i = START_PULL_FROM; i <= MAX_PULL; i++) {
    cost += COST;
    if (pity + 1 >= MAX_PITY) {
      gain += 1;
      pity = 0;
      if (firstPity) {
        pityResult.gain += gain;
        pityResult.cost += cost;
        firstPity = false
      }
    } else {
      const r = pull();

      gain += r.gain ?? 0;
      cost += r.cost ?? 0;

      if (r.resetPity) {
        pity = 0;
        if (firstPity) {
          pityResult.gain += gain;
          pityResult.cost += cost;
          firstPity = false;
        }
      } else {
        pity += 1;
      }
    }

    if (i === road[roadIndex]?.n) {
      // gain += road[roadIndex].gain ?? 0;
      cost += road[roadIndex].cost ?? 0;

      const r = result.get(road[roadIndex].n)
      r.gain += gain;
      r.cost += cost;
      r.times++;

      roadIndex++;
    }
  }
}

for (let i = 0; i < MAX_TEST; i++) {
  gacha();
}

console.log(`stop at first PU, avg ${(pityResult.cost / pityResult.gain).toFixed()} cost per gain`)
for (const [n, {cost, gain, times}] of result) {
  if (times === 0) {
    continue;
  }
  console.log(`stop at ${n} pulls, avg ${(cost / gain).toFixed(2)} cost per gain`);
}
