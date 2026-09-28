// 1 valid parenthesis problem  leetcode 20 https://leetcode.com/problems/valid-parentheses/

var isValid = function (s) {
  // alternate paranthesis like ()[]{}
  // i=0, i=1 is same
  const map = {
    "(": ")",
    "[": "]",
    "{": "}"
  }
  if (map[s[0]] === s[1]) {
    for (let i = 0; i < s.length - 1; i = i + 2) {
      if (map[s[i]] !== s[i + 1]) {
        return false;
      }
    }
  } else {
    // else open close paramenthesise like ([{[()]}]
    for (let i = 0; i < s.length / 2; i++) {
      if (map[s[i]] !== s[s.length - 1 - i]) {
        return false;
      }
    }
  }
  return true;

};

// console.log(isValid("()[]{}"));
// console.log(isValid("([{[()]}])"));

//"(([]){})" this is valid but i didn't consider this input 

const isValidOptimized = function (s) {
  const map = {
    "(": ")",
    "{": "}",
    "[": "]"
  }

  const stack = [];

  for (const char of s) {
    const opening = map[char];
    if (opening) { // if the character is an opening bracket
      stack.push(char);
    } else {
      const popOpend = stack.pop(); // if the character is a closing bracket
      if (map[popOpend] !== char) return false; // if the closing bracket does not match the opening bracket
    }
  }
  // if the stack is empty, then the string is valid
  const stackIsEmpty = stack.length === 0

  return stackIsEmpty
}

console.log(isValidOptimized("()[]{}"));
console.log(isValidOptimized("([{[()]}])"));
console.log(isValidOptimized("(([]){})"));
console.log(isValidOptimized("([)]")); // false — crossed, not nested

// stack: push opener. on closer, pop — last opener must match. empty at end → true
//
// 1. "()[]{}"
// char  stack after
// (     (
// )     empty     pop ( matches )
// [     [
// ]     empty     pop [ matches ]
// {     {
// }     empty     pop { matches }
// empty → true
//
// 2. "([{[()]}])"
//  ( [ { [ ( ) ] } ] )
//  0 1 2 3 4 5 6 7 8 9
//
// char  stack after
// (     (
// [     ( [
// {     ( [ {
// [     ( [ { [
// (     ( [ { [ (
// )     ( [ { [        pop ( matches )
// ]     ( [ {          pop [ matches ]
// }     ( [            pop { matches }
// ]     (              pop [ matches ]
// )     empty          pop ( matches )
// empty → true
//
// 3. "(([]){})"   ← if/else miss: not side-by-side AND not a perfect mirror
//  ( ( [ ] ) { } )
//  0 1 2 3 4 5 6 7
//
// char  stack after
// (     (
// (     ( (
// [     ( ( [
// ]     ( (            pop [ matches ]
// )     (              pop ( matches )     this ) pairs with index 1, not with s[6]
// {     ( {
// }     (              pop { matches }
// )     empty          pop ( matches )
// empty → true
//
// mirror if-else on this string: compare s[1]='(' with s[6]='}' → false. wrong.
// stack remembers order. that's why we need it.
//
// 4. "([)]"  false — looks nested, actually crossed
//  ( [ ) ]
//  0 1 2 3
//
// char  stack after
// (     (
// [     ( [
// )     —              pop [  map['[']=']' !== ')'  → return false
//
// never even looks at the last ]. top opener was [ so the next closer must be ].


// 2.  Maximum Nesting Depth of the Parentheses leetcode 1614 https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/

const map = {
  "(": ")"
}

var maxDepth = function (s) {
  const stack = [];
  let maxlengthofstack = stack.length;
  for (const char of s) {
    const openingChar = map[char]
    if (openingChar) {
      stack.push(openingChar)
      if (maxlengthofstack < stack.length) {
        maxlengthofstack = stack.length;
      }
    } else {
      if (char === ")") {
        stack.pop();
      }
    }
  }

  return maxlengthofstack;

};

var maxDepthOptimized = function (s) {
  let max = 0;
  let depth = 0;
  for (const char of s) {
    if (char === "(") { depth++; max = Math.max(max, depth); }
    if (char === ")") depth--;
  }
  return max;
}

console.log(maxDepth("(1+(2*3)+((8)/4))+1"));
console.log(maxDepth("(1)+((2))+(((3)))"));
console.log(maxDepth("()(())((()()))"));