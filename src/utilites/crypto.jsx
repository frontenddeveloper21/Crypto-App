import CryptoJS from "crypto-js";

var passphrase = "RTF127940DJSNBCB78484CNJDHDSD";

export const aesCrypt = (text, passphrase, operation) => {
  var iv = CryptoJS.enc.Hex.parse("f5adc9a3cfb2e47802f70144fef4e665"); // Use the same IV as in PHP
  var salt = CryptoJS.enc.Hex.parse("f5adc9a3cfb2e47802f70144fef4e665"); // Use the same salt as in PHP
  var key = CryptoJS.PBKDF2(passphrase, salt, {
    keySize: 256 / 32,
    iterations: 1000,
  });

  if (operation === "encrypt") {
    var encrypted = CryptoJS.AES.encrypt(text, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
  } else if (operation === "decrypt") {
    var decrypted = CryptoJS.AES.decrypt(text, key, {
      iv: iv,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  } else {
    return "Invalid operation specified.";
  }
};

export const encyrpt = (textToEncrypt) => {
  return aesCrypt(textToEncrypt, passphrase, "encrypt");
};

export const decrypt = (encrypted) => {
  return aesCrypt(encrypted, passphrase, "decrypt");
};
