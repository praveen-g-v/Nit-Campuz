import CryptoJS from 'crypto-js';




const encryptData =(data,SECRET_KEY)=> {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    return encrypted;
  }
  
  const decryptData = (encrypted,SECRET_KEY) => {
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  }

  export {encryptData,decryptData};
