// 1. Merge Two Sorted Lists (Leetcode 21) https://leetcode.com/problems/merge-two-sorted-lists/

function ListNode(val, next) {
  this.val = val;
  this.next = next;
}

const list1 = new ListNode(0, new ListNode(0, new ListNode(5)));
const list2 = new ListNode(1, new ListNode(4, new ListNode(4)));

var mergeTwoLists = function (list1, list2) {
  // let res = null;

  // while (list1 || list2) {
  //   if (list1 && list2 && list1.val < list2.val) {
  //     if (res) {
  //       res.next = list1;
  //     } else {
  //       res = list1;
  //     }
  //     list1 = list1.next;
  //   } else if (list1 && list2 && list1.val > list2.val) {
  //     if (res) {
  //       res.next = list2;
  //     } else {
  //       res = list2;
  //     }
  //     list2 = list2.next;
  //   } else if (list1 && list2 && list1.val === list2.val) {
  //     if (res) {
  //       res.next = list1;
  //     } else {
  //       res = list1;
  //     }
  //     list1 = list1.next;
  //   } else if (list1) {
  //     if (res) {
  //       res.next = list1;
  //     } else {
  //       res = list1;
  //     }
  //     list1 = list1.next;
  //   } else if (list2) {
  //     if (res) {
  //       res.next = list2;
  //     } else {
  //       res = list2;
  //     }
  //     list2 = list2.next;
  //   }
  // }
  // return res;
};

// 0-0-5,   1-4-4 -> 0-0-1-4-4-5
// 1,2,4, 1,3,4 -> 1-1-2-3-4-4


// 2. Remove Linked List Elements (Leetcode 203) https://leetcode.com/problems/remove-linked-list-elements/

function removeElements(head, val) {
  let res = new ListNode(0, head);
  while (head) {
    if (head.val !== val) {
      res.next = head
      res = res.next
    }
    head = head.next
  }

  return res.next
}

const head = new ListNode(1, new ListNode(2, new ListNode(6, new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6)))))));
const val = 6;

console.log(removeElements(head, val));