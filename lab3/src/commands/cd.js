const { getDirObj } = require('../helpers');
const { logAction } = require('../logger');

module.exports = (state, params) => {
  if (params.length !== 1) { 
    logAction(state.user, `cd ${params}`, 'Incorrect params length');
    throw new Error('Incorrect params length');
  }
  if (params[0] === '..') {
    const fileNames = (state.currentDir).split('/').filter(Boolean);
    fileNames.pop();
    logAction(state.user, `cd ${params}`);
    return state.currentDir = `/${fileNames.join('/')}`;
  }
  const dirObj = getDirObj(state.disk, state.currentDir, params[0]);
  if (!dirObj) { 
    logAction(state.user, `cd ${params}`, 'Unknown path');
    throw new Error('Unknown path');
  }
  if (!dirObj.rights.read.includes(state.user)) { 
    logAction(state.user, `cd ${params}`, 'Permission denied');
    throw new Error('Permission denied');
  }
  if (dirObj.type !== 'directory') { 
    logAction(state.user, `cd ${params}`, 'This is not a directory!');
    throw new Error('This is not a directory!');
  }
  logAction(state.user, `cd ${params}`);
  state.currentDir += `${params[0]}/`;
};
