// 1 Linked List Cycle Detection https://leetcode.com/problems/linked-list-cycle/

function ListNode(val, next) {
  this.val = val;
  this.next = next ?? null;
}


const node3 = new ListNode(3, new ListNode(4));
const head = new ListNode(1, new ListNode(2, node3));

// Cycle: slow +1, fast +2. If they ever meet, there is a loop. If fast hits null, there isn’t.

function hasCycle(head) {
  if (!head || !head.next) return false;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) return true;
  }

  return false;
}

console.log(hasCycle(head)); // false — this list is 1 → 2 → 3 → 4 → null, no loop

// dry run (no cycle)  1 → 2 → 3 → 4 → null
// start: slow=1  fast=1
//
// while (fast && fast.next)  then MOVE, then check meet
// 1. fast=1 has next    slow=2  fast=3     2 !== 3
// 2. fast=3 has next    slow=3  fast=4.next → null
// 3. fast is null       stop
// return false
//
// dry run (HAS cycle)  LeetCode: 3 → 2 → 0 → -4
//                                  ↑___________|   -4.next = 2
//
// start: slow=3  fast=3
//
// 1. slow=2  fast=0      2 !== 0
// 2. slow=0  fast=2      0 !== 2     (0 → -4 → 2)
// 3. slow=-4 fast=-4     MEET        (2 → 0 → -4)
// return true
//
// same as middle: slow +1, fast +2.
// middle: fast hits null → return slow
// cycle:  they land on the SAME node → loop exists
//         fast hits null             → no loop
//
// why while (fast && fast.next): need two hops. last node.next is null, stop.


// 2. Linked List Cycle II https://leetcode.com/problems/linked-list-cycle-ii/

function detectCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      let p = head;
      while (p !== slow) {
        p = p.next;
        slow = slow.next;
      }
      return p;
    }
  }

  return null;
}

// phase 1 = hasCycle. phase 2 = lines 69-73: p at head, slow stays at MEET, both +1
//
// LeetCode ex 1:  3 → 2 → 0 → -4
//                     ↑__________|   start = 2
//
// phase 1 (same as hasCycle)
// start: slow=3  fast=3
// 1. slow=2  fast=0
// 2. slow=0  fast=2      (0 → -4 → 2)
// 3. slow=-4 fast=-4     MEET inside the loop, NOT necessarily the start
//
// phase 2  p = head (3)   slow still at -4
// while (p !== slow):
//   3 !== -4  →  p = 2,  slow = -4.next = 2
//   2 === 2   →  stop
// return p → node 2     (cycle start)
//
// LeetCode ex 2:  1 → 2
//                 ↑___|     pos=0, start = 1
//
// phase 1
// start: slow=1  fast=1
// 1. slow=2  fast=1      (1 → 2 → 1)
// 2. slow=1  fast=1      MEET at node 1
//
// phase 2  p = head (1)   slow already at 1
// while (p !== slow):  1 === 1  →  loop never runs
// return p → node 1
// (meet WAS the start, so p and slow are already the same node)
//
// distance head → start  ==  distance meet → start  (around the loop)
// that's why walking both +1 lands on the start.
//
// longer tail — phase 2 takes MULTIPLE steps
//
// 1 → 2 → 3 → 4 → 5 → 6 → 7
//              ↑___________|     7.next = 4     start = 4
//
// phase 1  slow=1  fast=1
// 1. slow=2  fast=3
// 2. slow=3  fast=5
// 3. slow=4  fast=7
// 4. slow=5  fast=5      MEET at 5  (inside the loop, not the start)
//
// phase 2  p = 1    slow = 5
// while (p !== slow):
//   1 !== 5  →  p=2  slow=6
//   2 !== 6  →  p=3  slow=7
//   3 !== 7  →  p=4  slow=4     (7.next = 4)
//   4 === 4  →  stop
// return p → node 4
//
// three walks. p climbed the tail 1-2-3-4.
// slow walked the same count around the cycle 5-6-7-4.
// they lock on the start.
//
// MATH
// μ = steps from head to start     (here 1→2→3→4  so μ = 3)
// λ = cycle length                 (4→5→6→7      so λ = 4)
// a = steps from start to MEET     (4→5           so a = 1)
//
// fast is 2× slow, so when they meet:
//   2(μ + a) = μ + a + nλ     for some extra laps n
//   μ + a = nλ
//   μ = nλ - a  =  (n-1)λ  +  (λ - a)
//
// λ - a = steps from MEET back to start around the loop
//         (5→6→7→4  so 3)
//
// μ and (λ-a) differ by whole laps, so they are the SAME walk length
// on the cycle. that's why:
//   p walks μ from head        → lands on start
//   slow walks μ from meet     → also lands on start
//
// here μ = 3 and λ-a = 3. three steps. not a coincidence.