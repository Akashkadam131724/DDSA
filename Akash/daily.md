# Daily two problems

## Week rhythm

- **6 days** — 2 new problems. One pattern if you can (both recursion, both maps, both two pointers).
- **1 day** — review only. No new LeetCode. Re-trace the last 5–6 days from a blank page.

Review day is the point. New problems don't stick if you never close the book.

**How to review (one pass per problem, ~10 min each):**

1. Hide the file. Name the pattern out loud.
2. Dry-run the example on paper / comments.
3. Write the function again. Then peek.
4. Say TC + SC. If you can't, that's the one to redo.

Week 1 practice: 22–27 Sep (days 1–6). Review: **28 Sep**. Cover all 12 problems.

Copy a blank row when you start a practice day. File the code in `day-N-DD-mon.js`. Review days go in the table as `review` — no new #1/#2.

| Day | Date | #1 | #2 | Traced | Notes |
|-----|------|----|----|--------|-------|
| 1 | 22 Sep 2026 | [Merge sort](https://leetcode.com/problems/sort-an-array/) | [Quick sort](https://leetcode.com/problems/sort-an-array/) | yes | both recursion (base → recurse left/right → combine). merge dropped leftovers. TC: merge always n log n; quick n log n avg, n² worst |
| 2 | 23 Sep 2026 | [Two sum](https://leetcode.com/problems/two-sum/) | [Valid anagram](https://leetcode.com/problems/valid-anagram/) | | hash map: look up complement / count letters |
| 3 | 24 Sep 2026 | [Roman to integer](https://leetcode.com/problems/roman-to-integer/) | [Integer to roman](https://leetcode.com/problems/integer-to-roman/) | | same map, opposite directions: subtract if smaller before larger / greedy peel largest |
| 4 | 25 Sep 2026 | [Valid palindrome](https://leetcode.com/problems/valid-palindrome/) | [Two sum II](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) | yes | two pointers from the ends: skip junk then compare / sum too small left++ too big right-- |
| 5 | 26 Sep 2026 | | | | |
| 6 | 27 Sep 2026 | | | | |
| review | 28 Sep 2026 | — | — | | week 1: days 1–6, hide files, re-trace + TC/SC |

---

## Blank row

```
| N | DD Mon 2026 | | | | |
```
