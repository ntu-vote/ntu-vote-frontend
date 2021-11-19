import * as openpgp from 'openpgp';

export const signMsg = async(keyPair, passphrase, aMessage) =>{ 
    console.log('signing messages...');
    const _publicKey = await openpgp.readKey({
      armoredKey: keyPair.pubKey
    });

    const _privateKey = await openpgp.decryptKey({
        privateKey: await openpgp.readPrivateKey({
          armoredKey: keyPair.prvKey
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
    try {
        await verified; // throws on invalid signature
        return(cleartextMessage);
    } catch (e) {
        console.log("sign by key id: ", keyID);
        throw new Error('Signature could not be verified: ' + e.message);
    }
}