const { generateKeys, signMessage, verify } = require("./src/crypto");
const { log } = require("./src/logger");

const message = 'hello worlds';

const { publicKey, privateKey } = generateKeys(1024);
const signature = signMessage(message, privateKey);
const invalidSignature = Buffer.from(Array(16).fill(1));

log('Real signature',
    {
        message,
        signature: signature.toString(),
        isVerified: verify(message, signature, publicKey),
    });

log('Fake signature',
    {
        message,
        signature: invalidSignature.toString(),
        isVerified: verify(message, invalidSignature, publicKey),
    });