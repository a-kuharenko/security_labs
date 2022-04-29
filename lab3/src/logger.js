/* eslint-disable no-console */
const fs = require('fs');
const log = (msg) => console.log(msg);

const logColored = (msg, color) => console.log(color, msg);

const logError = (msg) => console.error(msg);

const logAction = (user, command, msg) => fs.appendFileSync('./logs.txt', `${new Date()} | User "${user}" runs command "${command}". ${msg ? `Error: ${msg}` : ''}\n`);

const color = {
  yellow: '\x1b[33m%s\x1b[0m',
};

module.exports = {
  log, logColored, color, logError, logAction,
};
