const BigNumber = require('bignumber.js');
const forge = require('node-forge');

const generatePrimeNumber = (bits) => {
  const options = {
    algorithm: {
      workers: -1,
      name: 'PRIMEINC',
    },
  };

  return new Promise((resolve, reject) => {
    forge.prime.generateProbablePrime(bits, options, (err, number) => {
      if (err) return reject(err);
      resolve(BigNumber(number.toString()));
    });
  });
};

module.exports = { generatePrimeNumber };
