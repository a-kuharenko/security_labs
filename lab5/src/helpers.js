const fs = require('fs');
const { logError } = require("./logger");

const readFile = (fileName) => {
  let data;
  try {
    data = fs.readFileSync(fileName, "utf-8").toString();
  } catch (err) {
    logError(err);
    throw new Error(`Cannot read the file: ${fileName}`);
  }
  return data;
};

const writeFile = (fileName, data) => {
  try {
    fs.writeFileSync(fileName, data.toString());
  } catch (err) {
    logError(err);
    throw new Error(`Cannot write the file: ${fileName}`);
  }
};

module.exports = { readFile, writeFile };
