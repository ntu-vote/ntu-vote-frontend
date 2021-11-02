import * as openpgp from 'openpgp';

export const sign = async(keyPair, passphrase, aMessage) =>{ 
    console.log('signing messages...');
    const _publicKey = await openpgp.readKey({
      armoredKey: keyPair['publicKeyArmored'] 
    });

    const _privateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({
          armoredKey: keyPair['privateKeyArmored']
        }),
        passphrase
    });

    const unsignedMessage = await openpgp.createCleartextMessage({ text: aMessage });
    const cleartextMessage = await openpgp.sign({
        message: unsignedMessage, // CleartextMessage or Message object
        signingKeys: _privateKey
    });
    
    const signedMessage = await openpgp.readCleartextMessage({
      cleartextMessage // parse armored message
    });
    
    const verificationResult = await openpgp.verify({
      message: signedMessage,
      verificationKeys: _publicKey
    });

    const { verified, keyID } = verificationResult.signatures[0];
    console.log("signedMessage: ", signedMessage); // '-----BEGIN PGP SIGNED MESSAGE ... END PGP SIGNATURE-----'
    try {
        await verified; // throws on invalid signature
        console.log('Signed by key id ' + keyID.toHex());
        return(signedMessage);
    } catch (e) {
        throw new Error('Signature could not be verified: ' + e.message);
    }
}