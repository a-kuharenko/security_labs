const { log } = require('../logger');

module.exports = (state, params) => {
  log(state.currentDir);
};
