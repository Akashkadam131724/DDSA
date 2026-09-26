// 1. Binary Search  https://leetcode.com/problems/binary-search/

//“keep going while there is still one index left to check.”

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

console.log(binarySearch(arr, 10));

// “keep going while there is still one index left to check.”
// left < right  → at least two cells still in play
// left == right → exactly one cell — still check it  (that's why <= )
// left > right  → nothing left, return -1
//
// index  0  1  2  3  4  5  6  7  8  9
// arr    1  2  3  4  5  6  7  8  9 10
//
// target 10
// start: left=0 right=9
//
// left  right  left<=right  mid  arr[mid]   move
// 0     9      yes          4    5 < 10     left = 5
// 5     9      yes          7    8 < 10     left = 8
// 8     9      yes          8    9 < 10     left = 9
// 9     9      yes (9<=9)   9    10 === 10  found index 9
//
// last row IS left == right. one box left. still enter the loop.
// if the while was left < right you'd quit at 9==9 and miss arr[9].
//
// target 1  (shrinks the other way, also hits left == right)
// left=0 right=9  mid=4  arr[4]=5 > 1  → right = 3
// left=0 right=3  mid=1  arr[1]=2 > 1  → right = 0
// left=0 right=0  equal. mid=0  arr[0]=1  found
//
// target 11  (missing — left passes right)
// same as target 10 until left=9 right=9
// arr[9]=10 < 11  → left = 10
// 10 <= 9 is false. empty range. return -1


// 2. Search insert position  https://leetcode.com/problems/search-insert-position/
// same loop as binary search. if found → return mid.
// if missing → left has walked to the index where target should sit.

function searchInsert(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
}

console.log(searchInsert([1, 3, 5, 6], 5)); // 2  found
console.log(searchInsert([1, 3, 5, 6], 2)); // 1  insert before 3
console.log(searchInsert([1, 3, 5, 6], 7)); // 4  insert at end

// index  0  1  2  3
// nums   1  3  5  6
//
// target 5 (found)
// left=0 right=3  mid=1  nums[1]=3 < 5  → left = 2
// left=2 right=3  mid=2  nums[2]=5 === 5  found 2
//
// target 2 (missing — insert at 1)
// left=0 right=3  mid=1  nums[1]=3 > 2  → right = 0
// left=0 right=0  mid=0  nums[0]=1 < 2  → left = 1
// 1 <= 0 is false. leftover left=1  → [1, 2, 3, 5, 6]
//
// target 7 (missing — insert at end)
// left=0 right=3  mid=1  nums[1]=3 < 7  → left = 2
// left=2 right=3  mid=2  nums[2]=5 < 7  → left = 3
// left=3 right=3  mid=3  nums[3]=6 < 7  → left = 4
// 4 <= 3 is false. leftover left=4
//
// binary search miss → return -1
// insert miss       → return left  (the hole you opened)
