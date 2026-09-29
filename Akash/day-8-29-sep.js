
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

const head = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5)))));

// 1. Reverse Linked List  https://leetcode.com/problems/reverse-linked-list/
var reverseList = function (head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev
};

// dry run  1 → 2 → 3 → 4 → 5 → null
// same 5 nodes. only .next flips. return prev (old tail). old head becomes tail.
//
// start:  prev=null  curr=1
//
//         prev    curr   next    after this step
// 1. save next=2, 1.next=null, prev=1, curr=2
//    null ← 1     2 → 3 → 4 → 5
//
// 2. save next=3, 2.next=1, prev=2, curr=3
//    null ← 1 ← 2     3 → 4 → 5
//
// 3. save next=4, 3.next=2, prev=3, curr=4
//    null ← 1 ← 2 ← 3     4 → 5
//
// 4. save next=5, 4.next=3, prev=4, curr=5
//    null ← 1 ← 2 ← 3 ← 4     5
//
// 5. save next=null, 5.next=4, prev=5, curr=null
//    null ← 1 ← 2 ← 3 ← 4 ← 5
//
// curr is null → loop stops. return prev → node 5
// 5 → 4 → 3 → 2 → 1 → null
//
// order of the 3 lines matters: save next FIRST or you lose the rest of the list.
//
// even length 1 → 2 → 3 → 4  same process, return node 4
// one node: while runs once, prev=that node, curr=null, return it
// empty: curr=null, skip loop, return prev (null)



// 2. Middle of the Linked List  https://leetcode.com/problems/middle-of-the-linked-list/
// slow +1, fast +2. when fast can't take two steps, slow is the middle.
// even length → two middles; this returns the SECOND one.

var middleNode = function (head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
};

// dry run  1 → 2 → 3 → 4 → 5 → null   (odd — one middle)
//
// start: slow=1  fast=1
//
// fast && fast.next ?
// 1. 1.next=2 yes   slow=2  fast=3
// 2. 3.next=4 yes   slow=3  fast=5
// 3. 5.next=null no  stop
// return slow → 3 → 4 → 5
//
// dry run  1 → 2 → 3 → 4 → 5 → 6 → null   (even — two middles 3 and 4)
//
// start: slow=1  fast=1
//
// 1. 1.next=2 yes   slow=2  fast=3
// 2. 3.next=4 yes   slow=3  fast=5
// 3. 5.next=6 yes   slow=4  fast=6.next.next → null
// 4. fast is null   stop
// return slow → 4 → 5 → 6    (second middle)
//
// why while (fast && fast.next):
// fast      → still a node (not off the list)
// fast.next → there is a second step to take
// skip either check and fast.next.next blows up on the last node.