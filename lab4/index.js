const { generatePrimeNumber } = require('./src/bignum/bignum');
const { log, logError } = require('./src/logger');
const { operations } = require('./src/operations/operations');

(async () => {
  try {
    const firstNumber = await generatePrimeNumber(64);
    const secondNumber = await generatePrimeNumber(64);

    log(`First prime number: ${firstNumber}`);
    log(`Second prime number: ${secondNumber}`);
    log('Operations examples:');
    operations.sum(firstNumber, secondNumber);
    operations.pow2(firstNumber);

    operations.mod(secondNumber, 27);
    operations.mult(firstNumber, 9);
  } catch (err) {
    logError(err);
  }
})();
