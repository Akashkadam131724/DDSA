class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  appendStart(data) {
    let newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  removeTop() {
    if (!this.head) return;
    this.head = this.head.next;
  }

  size() {
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }

  print() {
    let current = this.head;
    while (current) {
      console.log(current);

      current = current.next;
    }
  }

  printData() {
    let current = this.head;
    let index = 0;
    while (current) {
      console.log(index, ": ", current.data);

      current = current.next;
      index = index + 1;
    }
  }

  appendLast(data) {
    let newNode = new Node(data);

    if (!this.head) {
      return newNode;
    }
    let currentHead = this.head;
    while (currentHead.next) {
      currentHead = currentHead.next;
    }
    currentHead.next = newNode;
  }

  removeLast() {
    if (!this.head) return;
    let current = this.head;
    while (current.next.next) {
      current = current.next;
    }
    current.next = null;
  }

  appendAt(index, data) {
    if (index < 0 || index > this.size()) {
      console.error("Invalid Index");
      return;
    }
    const newNode = new Node(data);
    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
      // console.log(current);
    }
    newNode.next = current.next;
    // we update new node next at correct position and the correct next part
    current.next = newNode; // this line is updating the next to new node
    // return current;
  }

  removeAt(index) {
    if (index < 0 || index > this.size()) {
      console.error("Invalid Index");
      return;
    }
    if (index === 0) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    if (current.next) {
      current.next = current.next.next;
    }
  }

  reverse() {
    let current = this.head;
    let prev = null;
    while (current !== null) {
      let nextNode = current.next;
      current.next = prev;
      prev = current;
      current = nextNode;
    }

    this.head = prev;
  }

  palindrome() {
    let current = this.head;
    let str1 = "";
    let str2 = "";
    while (current !== null) {
      str1 = `${str1}${current.data}`;
      str2 = `${current.data}${str2}`;
      current = current.next;
    }
    return str1 === str2;
  }
}

function reverseWithRecursive(head) {
  if (head === null || head.next === null) {
    return head;
  }
  var newHead = reverseWithRecursive(head.next);
  var front = head.next;
  front.next = head;
  head.next = null;
  head = newHead;
}

const printLinkedListByArray = (head) => {
  let current = head;

  let result = [];
  while (current) {
    result.push(current.data);
    current = current.next;
  }
  console.log(result.join("->"));
};

function printLinkedList(head) {
  let currentNode = head;

  while (currentNode != null) {
    console.log(currentNode.data);
    currentNode = currentNode.next;
  }
}

function lineBreaker() {
  console.log("--------------------------------");
}

const ll = new LinkedList();
ll.appendStart("1");
ll.appendStart("1");
ll.appendStart("1");

// ll.print();
// console.log("currentSize", ll.size());
// ll.removeLast();
// ll.printData();
// console.log();
// ll.appendAt(0, "in serted by me");
// ll.addAt(2, "in serted");
// ll.printData();

// ll.removeAt(4);

// ll.printData();

// console.log("currentSize", ll.size());
// printLinkedListByArray(ll.head);
// ll.reverse();
// reverseWithRecursive(ll.head);
lineBreaker();
console.log(ll.palindrome());

printLinkedListByArray(ll.head);
// printLinkedList(ll.head);

// palindrome linked  list
// reverse linked list
// delete a node in linked list
// clear the linked list
// remove nth node from start linked list
// remove nth node from end linked list
// adding two numbers
