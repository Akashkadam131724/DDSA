# Time complexity from zero

Time complexity is **not** "how many seconds." It is:

> If the input gets bigger, how much more work does this code do?

Call the input size **n**. For us, n is usually `arr.length`.

The only question: **if n doubles, what happens to the work?**

| name | if n doubles | picture |
|---|---|---|
| **O(1)** | same work | grab `arr[0]` |
| **O(log n)** | **+1** step | keep cutting in half until 1 is left. 8→4→2→1 is **3** cuts. A million items is still ~20 cuts. |
| **O(n)** | **2×** | one loop |
| **O(n log n)** | a bit more than 2× | merge sort: log n levels, and each level still touches all n items |
| **O(n²)** | **4×** | loop inside a loop. 8 items → 64 steps |
| **O(2^n)** | explodes | n **+1** doubles the work. 2^10 = 1024, 2^20 ≈ a million, 2^30 ≈ a billion |

Run `count-the-work.js` while you read. It prints the actual step counts.

---

## O(1) — constant

Work **does not grow**. n = 3 or n = 3 million, same number of steps.

```js
function first(arr) {
  return arr[0]; // 1 look-up. always.
}
```

If n doubles → still 1 step.

---

## O(n) — linear  ("one loop")

One pass over the array. Twice as many items → twice as much work.

```js
function walk(arr) {
  for (let i = 0; i < arr.length; i++) {
    // 1 step per item
  }
}
```

| n | steps |
|---|-------|
| 4 | 4 |
| 8 | 8 |
| 16 | 16 |

If n doubles → work doubles. This is the "fair" one. Most simple loops.

---

## O(n²) — quadratic  ("loop inside a loop")

For **each** item, you walk the **whole** array again.

```js
function pairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      // 1 step per PAIR
    }
  }
}
```

n items → n × n pairs.

| n | steps |
|---|-------|
| 4 | 16 |
| 8 | 64 |
| 16 | 256 |

If n doubles → work becomes **4×** (2²).  
If n is 1000, that's a million steps. Nested loops grow fast.

Picture: n people in a room, everyone shakes hands with everyone. That's n².

---

## log n — "how many times can I cut it in half?"

Full walkthrough: [log.md](./log.md). Short version below.

Forget the math word. **log n** is just a counting question:

> Start at n. Keep cutting in half. How many cuts until you have 1?

```
8 → 4 → 2 → 1        3 cuts.   log(8)  = 3
16 → 8 → 4 → 2 → 1    4 cuts.   log(16) = 4
1024 → ... → 1        10 cuts.  log(1024) = 10
```

n doubled from 8 to 16. The number of cuts only went **3 → 4**.  
n can get huge. log n barely moves.

| n | log n (cuts to 1) |
|---|---|
| 2 | 1 |
| 8 | 3 |
| 16 | 4 |
| 1,024 | 10 |
| 1,000,000 | ~20 |

That is why binary search / "always take half" is fast. You are not visiting n items. You are asking "left or right?" about **20 times** for a million items.

```js
function halves(n) {
  let cuts = 0;
  while (n > 1) {
    n = Math.floor(n / 2);
    cuts++;
  }
  return cuts; // this IS log n
}
```

If n doubles → log n grows by **1**. One extra cut. That's it.

---

## O(n log n) — "n items, and for each 'level' we do n work"

This is merge sort and average-case quick sort.

Merge sort:

1. Split in half (that's the log n **levels** — how many times until pieces are size 1)
2. On **every** level, you still touch all n items (merge)

```
n = 8

level 1: merge 8 items
level 2: merge 8 items   (two groups of 4)
level 3: merge 8 items   (four groups of 2)

3 levels × 8 items = 24 steps
log(8) = 3, so n log n = 8 × 3 = 24
```

| n | log n | n log n |
|---|-------|---------|
| 8 | 3 | 24 |
| 16 | 4 | 64 |
| 1,000,000 | ~20 | ~20,000,000 |

If n doubles → work a bit more than doubles (the extra log n bump).  
Way better than n². A million items: ~20 million steps, not a trillion.

---

## O(2^n) — exponential  ("each extra item doubles the work")

Opposite of log.

- log: n doubles, work +1
- exponential: n **+1**, work **doubles**

```
n = 1 → 2 steps
n = 2 → 4
n = 3 → 8
n = 4 → 16
n = 10 → 1,024
n = 20 → ~1 million
n = 30 → ~1 billion   (your laptop cries)
```

Happens when each call branches into **two** calls that don't shrink enough, e.g. naive fibonacci:

```js
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2); // 2 branches every time
}
```

Picture: you tell 2 friends, each tells 2 friends, each of those tells 2...  
n rounds later you have 2^n people. That's exponential.

If n doubles → work is not 2×. It is squared-of-huge. Unusable except for tiny n.

---

## Space complexity (SC) — same idea, for memory

Not "how many seconds" — **how many extra boxes** do we allocate as n grows?

- O(1) extra — a few variables, no new array
- O(n) extra — a copy / a `result` array of size n (your merge)
- O(n) stack — recursion that goes n calls deep (worst-case quick sort)
- O(log n) stack — recursion that splits in half (merge sort)

---

## Map it back to day-1 sorts

```
                 TC best/avg     TC worst      SC (your code)
merge sort       O(n log n)      O(n log n)    O(n)
quick sort       O(n log n)      O(n²)         O(n)  (you copy left/right)
```

Why merge is always n log n: split is **always** half → always log n levels.

Why quick can be n²: last-element pivot on a sorted array → one side always empty → n levels of n work.

---

## Slow → fast (keep this order in your head)

```
faster  O(1)  →  O(log n)  →  O(n)  →  O(n log n)  →  O(n²)  →  O(2^n)  slower
         1 look    20 cuts     1 loop    merge sort     nested     fib
                   for a       over n    / avg quick    loops
                   million
```

When you see a solution, ask only:

1. Is there a loop over n? → at least **O(n)**
2. Loop inside a loop over n? → **O(n²)**
3. Do we cut in half each time? → **O(log n)** depth
4. Cut in half AND still touch all n each level? → **O(n log n)**
5. Does each call make two bigger/similar calls? → **O(2^n)** — stop
