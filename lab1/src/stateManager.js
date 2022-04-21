class StateManager {
  constructor({ user, disk, currentDir }) {
    this.user = user;
    this.disk = disk;
    this.currentDir = currentDir;
    this.file = null;
    this.content = null;
  }

  updateCurrentDir(value) {
    this.currentDir += value;
  }

  setDisk(value) {
    this.disk = JSON.parse(JSON.stringify(value));
  }

  setFile(value) {
    this.file = value;
  }

  setContent(value) {
    this.content = value;
  }

  deleteFileAndContent() {
    this.file = null;
    this.content = null;
  }
}

module.exports = {
  StateManager,
};
