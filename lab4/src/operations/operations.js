const { log } = require('../logger');

const operations = {
  sum: (a, b) => {
    log(`"${a}" + "${b}" = ${a.plus(b)}`);
  },
  pow2: (a) => {
    log(`"${a}" pow 2 = ${a.pow(2)}`);
  },
  mod: (a, b) => {
    log(`"${a}" mod "${b}" = ${a.mod(b)}`);
  },
  mult: (a, b) => {
    log(`"${a}" times "${b}" = ${a.times(b)}`);
  },
};

module.exports = { operations };
