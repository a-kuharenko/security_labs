const { save } = require('../secure/secure');
const { createDisk, getDirObj, onlyInf } = require('../helpers');
const { logAction } = require('../logger');

module.exports = (state, params) => {
  if (params.length !== 1) throw new Error('Incorrect params length');
  const dirObj = getDirObj(state.disk, state.currentDir);
  if (!dirObj) throw new Error('Unknown path');
  if (!dirObj.rights.write.includes(state.user)) { 
    logAction(state.user, `mkdir ${params}`, 'Permission denied');
    throw new Error('Permission denied');
  }
  state.disk = onlyInf(createDisk(state.disk, state.currentDir, params[0], state.user));
  save(state.disk);
};
