module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const openingBrackets = [];
  const closingBrackets = [];
  const sameBrackets = [];

  bracketsConfig.forEach(([opening, closing]) => {
    if (opening === closing) {
      sameBrackets.push(opening);
    } else {
      openingBrackets.push(opening);
      closingBrackets.push(closing);
    }
  });

  for (let i = 0; i < str.length; i++) {
    const currentChar = str[i];

    if (sameBrackets.includes(currentChar)) {
      if (stack.length && stack[stack.length - 1] === currentChar) {
        stack.pop(); 
      } else {
        stack.push(currentChar); 
      }
    } else if (openingBrackets.includes(currentChar)) {
      stack.push(currentChar);
    } else if (closingBrackets.includes(currentChar)) {
      const correspondingOpeningBracket = openingBrackets[closingBrackets.indexOf(currentChar)];
      if (!stack.length || stack.pop() !== correspondingOpeningBracket) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
