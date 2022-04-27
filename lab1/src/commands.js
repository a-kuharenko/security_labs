/* eslint-disable no-throw-literal */
const { join } = require('path');
const { logColored, color, log } = require('./logger');

const { encode } = require('./secure');
const { createDisk, deletedDisk, getDirObj } = require('./utils');

const commands = {
  exit: () => {
    log('Bye-bye');
    process.exit();
  },
  ls: (newState, params) => {
    if (params.length !== 0) {
      throw 'Incorrect params length';
    }
    const dirObj = getDirObj(newState.disk, newState.currentDir);
    if (!dirObj.rights.read.includes(newState.user)) {
      throw 'Permission denied';
    }
    Object.keys(dirObj.files).forEach((fileName) => {
      if (dirObj.files[fileName].type === 'directory') {
        logColored(fileName, color.yellow);
      } else {
        log(fileName);
      }
    });
  },
  cd: (state, params) => {
    if (params.length !== 1) throw 'Incorrect params length';
    const dirObj = getDirObj(state.disk, state.currentDir, params[0]);
    if (!dirObj) throw 'Unknown path';
    if (dirObj.type !== 'directory') throw 'This is not a directory!';
    if (!dirObj.rights.read.includes(state.user)) throw 'Permission denied';
    state.updateCurrentDir(`${params[0]}/`);
  },
  mkdir: (state, params) => {
    if (params.length !== 1) throw 'Incorrect params length';
    const dirObj = getDirObj(state.disk, state.currentDir);
    if (!dirObj) throw 'Unknown path';
    if (!dirObj.rights.write.includes(state.user)) throw 'Permission denied';
    state.setDisk(
      createDisk(state.disk, state.currentDir, params[0], state.user),
    );
    const diskPath = join(__dirname, '.', 'Disk:A');
    encode(diskPath, state.disk);
  },
  rm: (state, params) => {
    if (params.length !== 1) throw 'Incorrect params length';
    const dirObj = getDirObj(state.disk, state.currentDir, params[0]);
    if (!dirObj) throw 'Unknown path';
    if (!dirObj.rights.delete.includes(state.user)) {
      throw 'Permission denied';
    }
    state.setDisk(deletedDisk(state.disk, state.currentDir, params[0]));
    const diskPath = join(__dirname, '.', 'Disk:A');
    encode(diskPath, state.disk);
  },
  vi: (state, params) => {
    if (params.length !== 1) throw 'Incorrect params length';
    const dirObj = getDirObj(state.disk, state.currentDir, params[0]);
    if (!dirObj) {
      state.setDisk((
        createDisk(
          state.disk,
          state.currentDir,
          params[0],
          state.user,
        )
      ));
      const diskPath = join(__dirname, '.', 'Disk:A');
      encode(diskPath, state.disk);
    } else {
      if (!dirObj.rights.write.includes(state.user)) {
        throw 'Permission denied';
      }
      if (!dirObj.rights.read.includes(state.user)) {
        throw 'Permission denied';
      }
      if (dirObj.type !== 'file') throw 'This is not a file!';
    }
    state.setFile(params[0]);
    state.setContent(dirObj.content);
  },
  pwd: (newState) => {
    log(newState.currentDir);
  },
};

module.exports = {
  commands,
};
