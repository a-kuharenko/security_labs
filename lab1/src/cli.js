const readline = require('readline');
const { join } = require('path');

const { commands } = require('./commands');
const { createDisk } = require('./utils');
const { encode } = require('./secure');
const { log, logError } = require('./logger');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const write = (content) => rl.write(content);

const line = (path) => new Promise((resolve) => {
  rl.question(path, (data) => resolve(data));
});

const waitForPassword = () => new Promise((resolve) => {
  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
  }

  let password = '';
  let done = false;

  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);

  rl.write('Password: ');
  process.stdin.on('keypress', (chunk, key) => {
    if (!done) {
      if (key.name === 'return') {
        done = true;
        resolve(password);
      } else {
        readline.cursorTo(process.stdout, 0, 0);
        readline.clearScreenDown(process.stdout);
        rl.write('Password: ');
        password += key.name;
      }
    }
  });
});

const callCliLine = async (state) => {
  const answer = await line(state.file ? '' : `${state.currentDir}:$ `);
  const [command, ...params] = answer.split(' ');
  const commandFunc = commands[command];
  if (!commandFunc && !state.file) {
    log(`Incorrect command "${command}"`);
    return callCliLine(state);
  }

  if (state.file) {
    state.setDisk(
      createDisk(state.disk, state.currentDir, params[0], state.user, 'file'),
    );
    const diskPath = join(__dirname, '.', 'Disk:A');
    encode(diskPath, state.disk);
    state.deleteFileAndContent();
  } else {
    try {
      commandFunc(state, params);
      if (command === 'vi') {
        write(`\n${state.content}`);
      }
    } catch (e) {
      logError(e);
    }
  }
  return callCliLine(state);
};

module.exports = {
  line,
  callCliLine,
  waitForPassword,
};
