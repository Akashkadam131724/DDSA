// KEEP IN MIND: roman→int and int→roman are the SAME map, opposite directions.
//
//   roman → int  : walk the string. if this symbol is smaller than the next, subtract it (IV = 5-1).
//   int → roman  : greedy. peel off the biggest value that still fits (1994 → M, CM, XC, IV).
//
// Subtract pairs to remember: IV=4 IX=9  XL=40 XC=90  CD=400 CM=900

const ROMAN = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

const VALUE = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

// 1. Roman to Integer  https://leetcode.com/problems/roman-to-integer/
// Input:  "MCMXCIV"
// Output: 1994     M=1000, CM=900, XC=90, IV=4

function romanToInt(s) {
  let total = 0;

  for (let i = 0; i < s.length; i++) {
    const cur = VALUE[s[i]];
    const next = VALUE[s[i + 1]];

    if (next && cur < next) {
      total -= cur;
      console.log(`${s[i]}=${cur} < next ${s[i + 1]}=${next}  subtract → ${total}`);
    } else {
      total += cur;
      console.log(`${s[i]}=${cur}  add → ${total}`);
    }
  }

  return total;
}

console.log("roman to int", romanToInt("MCMXCIV"));

// M=1000  add → 1000
// C=100  < next M=1000  subtract → 900
// M=1000  add → 1900
// X=10   < next C=100   subtract → 1890
// C=100  add → 1990
// I=1    < next V=5     subtract → 1989
// V=5    add → 1994
// roman to int 1994

// 2. Integer to Roman  https://leetcode.com/problems/integer-to-roman/
// Input:  1994
// Output: "MCMXCIV"

function intToRoman(num) {
  let result = "";
  let n = num;

  for (const symbol in ROMAN) {
    const value = ROMAN[symbol];

    while (n >= value) {
      result += symbol;
      n -= value;
      console.log(`peel ${value} as ${symbol}  left=${n}  so far=${result}`);
    }
  }

  return result;
}

console.log("int to roman", intToRoman(1994));

// peel 1000 as M   left=994   so far=M
// peel 900  as CM  left=94    so far=MCM
// peel 90   as XC  left=4     so far=MCMXC
// peel 4    as IV  left=0     so far=MCMXCIV
// int to roman MCMXCIV

// ---------------------------------------------------------------------------
// TC / SC
//
// ROMAN → INT
//   one pass over the string                      TC O(n)    SC O(1)
//   n = length of the roman string (at most ~15 for typical problems)
//
// INT → ROMAN
//   at most 13 symbol kinds, peel each a few times
//   n is the number, but we don't loop n times — greedy over a fixed table
//                                                 TC O(1)    SC O(1)
//   (fixed 13-row table. result string is also tiny)
//
// If you remember one thing: smaller-before-larger means subtract.
// IV IX XL XC CD CM. Everything else is just add / peel.
