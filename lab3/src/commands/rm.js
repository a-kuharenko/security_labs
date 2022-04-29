const { save } = require('../secure/secure');
const { deletedDisk, getDirObj, onlyInf } = require('../helpers');
const { logAction } = require('../logger');

module.exports = (state, params) => {
  if (params.length !== 1) throw new Error('Incorrect params length');
  const dirObj = getDirObj(state.disk, state.currentDir, params[0]);
  if (!dirObj) throw new Error('Unknown path');
  if (!dirObj.rights.delete.includes(state.user)) { 
    logAction(state.user, `rm ${params}`, 'Permission denied');
    throw new Error('Permission denied');
  }
  state.disk = onlyInf(deletedDisk(state.disk, state.currentDir, params[0]));
  logAction(state.user, `rm ${params}`);
  save(state.disk);
};
