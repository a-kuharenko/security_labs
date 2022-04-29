const { log } = require("../logger");

module.exports = (state, params) => {
  log('Bye-bye');
  process.exit();
};
