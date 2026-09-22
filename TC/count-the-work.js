// Run: node DSA/TC/count-the-work.js
// Watch how steps grow when n doubles. That IS time complexity.

function countLog(n) {
  let cuts = 0;
  let x = n;
  while (x > 1) {
    x = Math.floor(x / 2);
    cuts++;
  }
  return cuts;
}

function countLinear(n) {
  let steps = 0;
  for (let i = 0; i < n; i++) steps++;
  return steps;
}

function countNLogN(n) {
  // merge sort: log n levels, n work each level
  return n * countLog(n);
}

function countQuadratic(n) {
  let steps = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) steps++;
  }
  return steps;
}

function countExponential(n) {
  return 2 ** n; // 2^n. recursive version below is the same idea, just slower to run
}

// each call makes TWO calls — that IS exponential. only safe for tiny n.
function countExponentialRecurse(n) {
  if (n <= 1) return 1;
  return countExponentialRecurse(n - 1) + countExponentialRecurse(n - 1);
}

const sizes = [2, 4, 8, 16];

console.log("n\tlog n\tn\tn log n\tn²\t2^n");
console.log("-".repeat(56));

for (const n of sizes) {
  console.log(
    [
      n,
      countLog(n),
      countLinear(n),
      countNLogN(n),
      countQuadratic(n),
      countExponential(n),
    ].join("\t")
  );
}

console.log(`
read the table left → right (fast → slow)

n doubles 2 → 4 → 8 → 16
  log n    1 → 2 → 3 → 4         +1 each time
  n        2 → 4 → 8 → 16        doubles
  n log n  2 → 8 → 24 → 64       a bit more than doubles
  n²       4 → 16 → 64 → 256     ×4 each time
  2^n      4 → 16 → 256 → 65536  explodes (n+1 would double it)

2^10 = 1024
2^20 = ~1 million
2^30 = ~1 billion   ← do not recurse this
`);
