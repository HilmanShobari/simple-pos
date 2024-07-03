// randomNumber.js
function generateRandomNumber(digit) {
  if (digit <= 0) {
    return 0;
  }

  const min = Math.pow(10, digit - 1);
  const max = Math.pow(10, digit) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default generateRandomNumber;
