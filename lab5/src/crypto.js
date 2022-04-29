const crypto = require('crypto');

const generateKeys = (length) =>
  crypto.generateKeyPairSync("rsa", { modulusLength: length });

const encrypt = (data, publicKey) =>
  crypto.publicEncrypt(
    {
      key: publicKey,
      oaepHash: "sha256",
    },
    Buffer.from(data)
  );

const decrypt = (data, privateKey) =>
  crypto
    .privateDecrypt(
      {
        key: privateKey,
        oaepHash: "sha256",
      },
      data
    )
    .toString();

module.exports = { generateKeys, encrypt, decrypt };
