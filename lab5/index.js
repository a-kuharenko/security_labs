const { generateKeys, encrypt, decrypt } = require("./src/crypto");
const { readFile, writeFile } = require("./src/helpers");

const data = readFile('./input.txt');

const { publicKey, privateKey } = generateKeys(1024);
const encrypted = encrypt(data, publicKey);
const decrypted = decrypt(encrypted, privateKey);

writeFile('output.txt', `Data from input.txt file is '${data}'
encrypted data is '${encrypted.toString('utf-8')}'
decrypted data is '${decrypted}'
data is${data === decrypted ? '' : 'not'} equal to decrypted`)