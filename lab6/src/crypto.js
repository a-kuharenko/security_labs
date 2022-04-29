const crypto = require('crypto');

const generateKeys = (length) => crypto.generateKeyPairSync('rsa', { modulusLength: length });

const signMessage = (message, privateKey) => {
    const sign = crypto.createSign('SHA256');
    sign.update(message);
    return sign.sign(privateKey);
};

const verify = (message, signature, publicKey) => {
    const verify = crypto.createVerify('SHA256');
    verify.update(message);
    return verify.verify(publicKey, signature);
};

module.exports = {
    generateKeys,
    signMessage,
    verify,
}