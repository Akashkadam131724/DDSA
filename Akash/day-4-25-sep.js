// 1. Valid Palindrome  https://leetcode.com/problems/valid-palindrome/
// Input:  s = "A man, a plan, a canal: Panama"  → true
// Input:  s = "race a car"                     → false

// function isPalindrome(s) {
//   const cleaned = s.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
//   return cleaned === cleaned.split("").reverse().join("");
// }

function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    while (left < right && !isAlphaNum(s[left])) left++;
    while (left < right && !isAlphaNum(s[right])) right--;

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

function isAlphaNum(ch) {
  return /[a-zA-Z0-9]/.test(ch);
  // or without regex:
  // const c = ch.toLowerCase();
  // return (c >= "a" && c <= "z") || (c >= "0" && c <= "9");
}

console.log("palindrome", isPalindrome("A man, a plan, a canal: Panama"));
console.log("palindrome", isPalindrome("race a car"));

// indices for "A man, a plan, a canal: Panama"  length=30  right starts at 29
//  0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29
//  A   m a n ,   a   p  l  a  n  ,     a     c  a  n  a  l  :     P  a  n  a  m  a
//
// dry run — skip junk FIRST, then compare, then left++ right--
//
// start        skip                         compare         after
// L0  R29      none                         A/a === a/a     1, 28
// L1  R28      L1 space → L2 m              m === m         3, 27
// L3  R27      none                         a === a         4, 26
// L4  R26      none                         n === n         5, 25
// L5  R25      L5 comma, L6 space → L7 a    a === a         8, 24
// L8  R24      L8 space → L9 p              p === P → p     10, 23
// L10 R23      R23 space, R22 colon → R21 l l === l         11, 20
// L11 R20      none                         a === a         12, 19
// L12 R19      none                         n === n         13, 18
// L13 R18      L13 comma, L14 space → L15 a a === a         16, 17
// L16 R17      L16 space → L17 c            c === c (both 17)
//                                           then L++ R-- →  18, 16
// 18 < 16 is false → return true
//
// "race a car"  length=10  right starts at 9
//  0 1 2 3 4 5 6 7 8 9
//  r a c e   a   c a r
//
// L0 R9   none              r === r    1, 8
// L1 R8   none              a === a    2, 7
// L2 R7   none              c === c    3, 6
// L3 R6   R6 space → R5 a   e !== a    return false


// 2. Two Sum II - Input Array Is Sorted  https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/
// Input: numbers = [2,7,11,15], target = 9  → [1,2]
// Input: numbers = [2,3,4], target = 6      → [1,3]
// Input: numbers = [-1,0], target = -1       → [1,2]

function twoSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++;
    else right--;
  }
  return [];
}

console.log("two sum", twoSum([2, 7, 11, 15], 9));
console.log("two sum", twoSum([2, 3, 4], 6));
console.log("two sum", twoSum([-1, 0], -1));

// rule: sum === target → found (return 1-based)
//       sum <  target → too small → left++
//       sum >  target → too big   → right--
//
// [2, 7, 11, 15] target=9     0-based: 0 1 2 3     1-based: 1 2 3 4
//  2  7  11  15
//  L            R
//
// L0 R3   2+15=17 > 9   too big    right-- → 0, 2
// L0 R2   2+11=13 > 9   too big    right-- → 0, 1
// L0 R1   2+7=9         hit        return [1, 2]
//
// [2, 3, 4] target=6
//  2  3  4
//  L     R
//
// L0 R2   2+4=6   hit   return [1, 3]
//
// [-1, 0] target=-1
//  -1  0
//   L  R
//
// L0 R1   -1+0=-1  hit  return [1, 2]