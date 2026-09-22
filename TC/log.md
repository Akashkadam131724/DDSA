# log — from zero

## Formulas (keep this)

All of these are **base 2** in DSA. `log` means `log₂`.

**Definition**

```
log a = c        means        2^c = a
log 8 = 3        means        2³ = 8
```

**Cancel (they undo each other)**

```
log(2^k) = k
2^(log n) = n
```

**Special values**

```
log 1 = 0          because  2^0 = 1
log 2 = 1          because  2^1 = 2
```

**Product / quotient / power**

```
log(m · n) = log m + log n          log(16 · 2) = log 16 + log 2
log(m / n) = log m − log n          log(32 / 2) = log 32 − log 2
log(m^k)   = k · log m              log(8^2)    = 2 · log 8
```

**Halve / double (DSA every day)**

```
log(2n) = log n + 1        n doubles, log +1
log(n/2) = log n − 1       n halves,  log −1
```

**Change of base** (only if a calculator gives you log₁₀)

```
log₂(n) = log₁₀(n) / log₁₀(2)
```

For Big O the base does not matter. Interview answer is still **O(log n)**.

---

Yes. **log 8 = 3**.

In DSA, log means **base 2** unless someone says otherwise.

> log₂(8) = 3  means  2 × 2 × 2 = 8
>             also    8 → 4 → 2 → 1   is 3 cuts in half

Same fact, two directions.

---

## The one question log answers

**2 to the power of *what* equals this number?**

| question | answer | because |
|---|---|---|
| 2^? = 2 | **1** | 2 |
| 2^? = 4 | **2** | 2 × 2 |
| 2^? = 8 | **3** | 2 × 2 × 2 |
| 2^? = 16 | **4** | 2 × 2 × 2 × 2 |
| 2^? = 32 | **5** | keep doubling |

So:

```
log 2  = 1
log 4  = 2
log 8  = 3
log 16 = 4
log 32 = 5
```

log is just **the exponent**. The little number on top of the 2.

```
2³ = 8      ← multiply 2, three times
log 8 = 3   ← how many 2s did I multiply?
```

They undo each other. That is the whole trick.

---

## The cutting-in-half way (use this in DSA)

Start at n. Halve it until you hit 1. Count the cuts.

```
8  →  4  →  2  →  1        3 cuts   log 8  = 3
16 →  8  →  4  →  2  →  1   4 cuts   log 16 = 4
```

```js
function log2(n) {
  let cuts = 0;
  while (n > 1) {
    n = n / 2;
    cuts++;
  }
  return cuts;
}

log2(8);  // 3
log2(16); // 4
```

If n is not a clean power of 2 (say 10), you still count cuts, you just land between two answers:

```
10 → 5 → 2.5 → 1.25 → ...   a bit more than 3
```

log 8 = 3, log 16 = 4, so **log 10 is about 3.3**. For Big O we do not care about the .3. We say O(log n).

---

## Cheat sheet — powers of 2 (memorise these)

You will see these forever.

| 2^k | n | log n |
|---|---|---|
| 2^0 | 1 | 0 |
| 2^1 | 2 | 1 |
| 2^2 | 4 | 2 |
| 2^3 | **8** | **3** |
| 2^4 | 16 | 4 |
| 2^5 | 32 | 5 |
| 2^6 | 64 | 6 |
| 2^7 | 128 | 7 |
| 2^8 | 256 | 8 |
| 2^9 | 512 | 9 |
| 2^10 | **1,024** | **10** |
| 2^20 | ~1 million | 20 |
| 2^30 | ~1 billion | 30 |

Read it either way:

- **down:** 2 to the 10 is about a thousand
- **up:** log of a million is about 20

A million-item array, binary search / merge-sort depth ≈ **20** steps of splitting. Not a million.

---

## Why n doubling only adds +1 to log

```
log 8  = 3     (8 items)
log 16 = 4     (n doubled, log only +1)
log 32 = 5     (doubled again, log only +1)
```

Every time the array **doubles**, you need **one extra cut**. That is why O(log n) barely grows.

---

## log vs 2^n  (opposites)

```
log:   start at 8, cut in half, 3 steps to 1      small
2^n:   start at 1, double, 3 steps to 8          wait that's the reverse

n = 10:   log n ≈ 10          2^n = 1024
n = 20:   log n ≈ 20          2^n ≈ 1 million
n = 30:   log n ≈ 30          2^n ≈ 1 billion
```

log climbs like stairs. Exponential is a rocket. Same numbers, opposite direction.

---

## What about log₁₀ and ln?

Calculators:

- **log** on a phone often means log₁₀ (10^? = n). log₁₀(1000) = 3 because 10×10×10 = 1000
- **ln** means logₑ (natural log). ignore this for DSA
- **DSA / Big O** means **log₂** (2^? = n)

For Big O the base **does not matter**. log₂, log₁₀, ln are all O(log n). They only differ by a constant multiplier. Interview answer: **O(log n)**.

When you *compute* a number by hand in this folder, use **base 2**: how many times do I cut in half?

---

## Solve these

All logs are **base 2**. Cover the answers at the bottom. Cut in half, or ask "2 to the what?"

### A — evaluate

1. log 2 = ?
2. log 8 = ?
3. log 32 = ?
4. log 64 = ?
5. log 256 = ?
6. log 1 = ?
7. log 1024 = ?

### B — the other direction (undo log)

8. 2^3 = ?
9. 2^6 = ?
10. 2^8 = ?
11. 2^10 = ?
12. If log x = 5, x = ?
13. If log x = 0, x = ?

### C — between which two integers? (not a clean power of 2)

Write `between a and b`. Example: log 10 is between 3 and 4, because 8 < 10 < 16.

14. log 10
15. log 20
16. log 50
17. log 100
18. log 1000

### D — identities (rewrite, then evaluate)

Remember: log is the exponent, so they cancel.

- log(2^k) = k
- 2^(log n) = n
- n doubles → log n goes +1, so log(2n) = log n + 1
- n halves → log n goes −1, so log(n/2) = log n − 1

19. log(2^7) = ?
20. 2^(log 32) = ?
21. log 8 + 1 = log ?          (what number?)
22. log 32 − 1 = log ?
23. log 16 + log 2 = ?         (hint: 16×2 = 32, so logs add)
24. 2 × log 8 = log ?          (hint: 8^2 = 64)

### E — DSA pictures

25. Array of 8 items, always split in half. How many levels until size 1?
26. Array of 64 items. Binary search worst-case cuts ≈ ?
27. n = 1,000,000. merge sort depth ≈ ?
28. n doubles from 512 → 1024. log n goes from ? → ?
29. One loop over n=32 is 32 steps. n log n is ? steps
30. Nested loops n=32 is ? steps. Compare to Q29.

---

## Answers

A  
1. 1  
2. 3  
3. 5  
4. 6  
5. 8  
6. 0          (2^0 = 1. zero cuts, you already have 1)  
7. 10  

B  
8. 8  
9. 64  
10. 256  
11. 1024  
12. 32  
13. 1  

C  
14. between 3 and 4     (8 < 10 < 16)  
15. between 4 and 5     (16 < 20 < 32)  
16. between 5 and 6     (32 < 50 < 64)  
17. between 6 and 7     (64 < 100 < 128)  
18. between 9 and 10    (512 < 1000 < 1024). almost 10  

D  
19. 7  
20. 32  
21. 16                 (log 8 = 3, +1 → 4, and log 16 = 4)  
22. 16                 (log 32 = 5, −1 → 4, log 16 = 4)  
23. 5                  (log 16 + log 2 = 4 + 1 = 5, also log 32)  
24. 64                 (2 × 3 = 6, log 64 = 6)  

E  
25. 3                  (log 8)  
26. 6                  (log 64)  
27. ~20  
28. 9 → 10             (only +1)  
29. 32 × 5 = 160       (log 32 = 5)  
30. 32 × 32 = 1024     (n²). much bigger than 160. that's n log n vs n².
