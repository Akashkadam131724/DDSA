const nums = [8, 3, 5, 2, 7, 4];

// KEEP IN MIND: both merge sort and quick sort are recursion problems.
// Same 3 steps every time:
//   1. base case  — array of 0 or 1 is already sorted, return it
//   2. recurse    — call the same function on smaller pieces (left + right)
//   3. combine    — stitch those sorted pieces back into one array
//
// Difference is only HOW we split / combine:
//   merge sort → split in the middle, sort both halves, then merge
//   quick sort → pick a pivot, split around it, recurse, then join left + pivot + right

// 1. Merge Sort  (recursion: split → recurse left/right → merge)
function mergeSort(arr, depth = 0) {
  const pad = "  ".repeat(depth);
  console.log(`${pad}split ${JSON.stringify(arr)}`);

  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  const sortedLeft = mergeSort(left, depth + 1);
  const sortedRight = mergeSort(right, depth + 1);
  const merged = merge(sortedLeft, sortedRight);

  console.log(`${pad}merge ${JSON.stringify(sortedLeft)} + ${JSON.stringify(sortedRight)} => ${JSON.stringify(merged)}`);
  return merged;
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // leftover from whichever side still has values
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}

// console.log("result", mergeSort(nums));

// split [8,3,5,2,7,4]
//   split [8,3,5]
//     split [8]
//     split [3,5]
//       split [3]
//       split [5]
//     merge [3] + [5] => [3,5]
//   merge [8] + [3,5] => [3,5,8]
//   split [2,7,4]
//     split [2]
//     split [7,4]
//       split [7]
//       split [4]
//     merge [7] + [4] => [4,7]
//   merge [2] + [4,7] => [2,4,7]
// merge [3,5,8] + [2,4,7] => [2,3,4,5,7,8]
// result [ 2, 3, 4, 5, 7, 8 ]

// 2. Quick Sort  (recursion: partition around pivot → recurse left/right → join)
function quickSort(arr, depth = 0) {
  const pad = "  ".repeat(depth);
  console.log(`${pad}sort ${JSON.stringify(arr)}`);

  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  console.log(`${pad}pivot ${pivot} | left ${JSON.stringify(left)} | right ${JSON.stringify(right)}`);

  const sortedLeft = quickSort(left, depth + 1);
  const sortedRight = quickSort(right, depth + 1);
  const result = [...sortedLeft, pivot, ...sortedRight];

  console.log(`${pad}join ${JSON.stringify(sortedLeft)} + [${pivot}] + ${JSON.stringify(sortedRight)} => ${JSON.stringify(result)}`);
  return result;
}

console.log("result", quickSort(nums));

// sort [8,3,5,2,7,4]
// pivot 4 | left [3,2] | right [8,5,7]
//   sort [3,2]
//   pivot 2 | left [] | right [3]
//     sort []
//     sort [3]
//   join [] + [2] + [3] => [2,3]
//   sort [8,5,7]
//   pivot 7 | left [5] | right [8]
//     sort [5]
//     sort [8]
//   join [5] + [7] + [8] => [5,7,8]
// join [2,3] + [4] + [5,7,8] => [2,3,4,5,7,8]
// result [ 2, 3, 4, 5, 7, 8 ]

// ---------------------------------------------------------------------------
// TC / SC  (n = length of the array)
//
// Recurrence for both:  T(n) = T(left) + T(right) + O(n)
//   O(n) is the combine step: merge() OR the partition loop
//   depth of recursion decides if that becomes n log n or n²
// ---------------------------------------------------------------------------

// MERGE SORT
//   split is always mid → two halves of size n/2 every time
//   levels of recursion = log n
//   each level walks all n elements (slice + merge)
//
//   TC  best / avg / worst : O(n log n)     always balanced
//   SC  O(n)                                new left/right slices + merge result
//       + O(log n) call stack
//
//   why SC is O(n): you never hold every level at once (left finishes, then
//   right), but one level always needs ~n extra slots for copies + merge.

// QUICK SORT  (this version: last element as pivot, new left/right arrays)
//   partition loop is O(n), then recurse on whatever sizes you got
//
//   TC  best / avg : O(n log n)   pivot lands near the middle
//       worst      : O(n²)        pivot is always min or max
//                                 (sorted / reverse-sorted array)
//                                 T(n) = T(n-1) + O(n) → n + (n-1) + ... + 1
//
//   SC  avg  : O(n) extra arrays (left, right, join) + O(log n) stack
//       worst: O(n) extra arrays + O(n) stack  (one side always empty)
//
//   note: in-place quick sort (swaps, no new arrays) is O(log n) avg stack
//   and O(1) extra. THIS file is not that — we copy into left/right.

// CHEAT SHEET
//                 TC best/avg     TC worst      SC
//   merge sort    O(n log n)      O(n log n)    O(n)
//   quick sort    O(n log n)      O(n²)         O(n) here / O(log n) in-place
