import * as openpgp from 'openpgp';

export const generateKey = async(passphrase, aName, aEmail) => {
  console.log('generating keys...');
  const { privateKey, publicKey, revocationCertificate } = await openpgp.generateKey({
    type: 'ecc', // Type of the key, defaults to ECC
    curve: 'curve25519', // ECC curve name, defaults to curve25519
    userIDs: [{ name: aName, email: aEmail }], // you can pass multiple user IDs
    passphrase: passphrase, // protects the private key
    format: 'armored' // output key format, defaults to 'armored' (other options: 'binary' or 'object')
  });
  return ({
    'privateKeyArmored': privateKey,
    'publicKeyArmored': publicKey,
    'revoCert': revocationCertificate
  });
}
