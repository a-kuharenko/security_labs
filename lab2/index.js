const { decode } = require('./src/secure/secure');
const { initDisk } = require('./src/init/init');
const { cliLine } = require('./src/cli/cli');
const { verifyUserWithRules } = require('./src/secure/access');
const { logColored } = require('./src/logger');

(async () => {
  try {
    initDisk();
    const disk = decode();
    const userData = await verifyUserWithRules(disk);
    await cliLine({ user: userData.login, currentDir: '/', disk });
  } catch (e) {
    logColored(e.message, '\x1b[31m%s\x1b[0m');
  }
})();
