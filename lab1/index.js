const { join } = require('path');

const { decode, users } = require('./src/secure');
const { initDisk } = require('./src/fileSystem');
const { callCliLine, waitForPassword } = require('./src/cli');
const { StateManager } = require('./src/stateManager');
const { log, logError } = require('./src/logger');

const DISK_NAME = 'Disk:A';

(async () => {
  try {
    const diskPath = join(__dirname, '.', DISK_NAME);
    initDisk(diskPath);

    const enteredPassword = await waitForPassword();
    const user = users[enteredPassword];
    if (!user) {
      log('Incorrect password');
      process.exit();
    }

    log(`Hello, ${user}`);
    const disk = decode(diskPath);
    const state = new StateManager({ user, currentDir: '/', disk });
    await callCliLine(state);
  } catch (err) {
    logError(err);
  }
})();
