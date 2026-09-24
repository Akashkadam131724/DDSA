const nums = [2, 7, 11, 15];
const target = 9;

// KEEP IN MIND: both two sum and valid anagram are hash map problems.
// Same idea: walk once, store what you have seen, look up in O(1).
//
//   two sum        → store number → index. look up (target - current)
//   valid anagram  → store letter → count. every count must match
//
// If you sort instead, it still works, just slower (n log n). Map is O(n).

// 1. Two Sum  https://leetcode.com/problems/two-sum/
// Given nums and target, return indices of two numbers that add up to target.
// Input:  nums = [2, 7, 11, 15], target = 9
// Output: [0, 1]   because 2 + 7 = 9

function twoSum(nums, target) {
  const seen = {}; // number → index

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    console.log(`i=${i} num=${nums[i]} need=${need} seen=${JSON.stringify(seen)}`);

    if (seen[need] !== undefined) {
      console.log(`found ${need} at index ${seen[need]} + ${nums[i]} at index ${i}`);
      return [seen[need], i];
    }

    seen[nums[i]] = i;
  }

  return [];
}

console.log("two sum", twoSum(nums, target));

// i=0 num=2  need=7  seen={}
// i=1 num=7  need=2  seen={"2":0}
// found 2 at index 0 + 7 at index 1
// two sum [ 0, 1 ]

// 2. Valid Anagram  https://leetcode.com/problems/valid-anagram/
// Same letters, same counts, any order.
// Input:  s = "anagram", t = "nagaram"  → true
// Input:  s = "rat",     t = "car"      → false

function isAnagram(s, t) {
  if (s.length !== t.length) {
    console.log("different length → false");
    return false;
  }

  const count = {};

  for (let i = 0; i < s.length; i++) {
    count[s[i]] = (count[s[i]] || 0) + 1;
    count[t[i]] = (count[t[i]] || 0) - 1;
    console.log(`s=${s[i]} t=${t[i]} count=${JSON.stringify(count)}`);
  }

  for (const letter in count) {
    if (count[letter] !== 0) {
      console.log(`letter ${letter} leftover ${count[letter]} → false`);
      return false;
    }
  }

  console.log("all counts 0 → true");
  return true;
}

console.log("anagram", isAnagram("anagram", "nagaram"));
console.log("anagram", isAnagram("rat", "car"));

// s=a t=n  {a:1, n:-1}
// s=n t=a  {a:0, n:0}
// s=a t=g  {a:1, n:0, g:-1}
// ... all land on 0
// anagram true
// anagram false   (r,a,t vs c,a,r — c and t leftover)

// ---------------------------------------------------------------------------
// TC / SC
//
// TWO SUM
//   brute: two loops, try every pair              TC O(n²)   SC O(1)
//   this:  one loop + map lookup                  TC O(n)    SC O(n)
//
// VALID ANAGRAM
//   sort both strings then compare                TC O(n log n)  SC O(n)
//   this:  one count map                          TC O(n)        SC O(1)
//          (at most 26 letters if lowercase a-z, so map is constant size)
//
// If you remember one thing: looking something up in a map is O(1).
// That is why both drop from n² / n log n down to n.
