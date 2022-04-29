const { existsSync } = require('fs');
const { save } = require('../secure/secure');
const initData = require('../../config/initData.json');
const { diskPath } = require('../secure/secure');

const initDisk = () => {
  if (existsSync(diskPath)) return;
  save(initData);
};

module.exports = {
  initDisk,
};
