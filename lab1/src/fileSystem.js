const { existsSync } = require('fs');

const { encode } = require('./secure');
const initData = require('../config/fileSystem.json');

const initDisk = (filePath) => {
  if (existsSync(filePath)) {
    return;
  }
  encode(filePath, initData);
};

module.exports = {
  initDisk,
};
