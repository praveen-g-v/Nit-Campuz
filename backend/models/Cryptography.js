const  CryptoJS =require( 'crypto-js');




const encryptData =async(data,SECRET_KEY)=> {
    const encrypted =await  CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    return encrypted;
  }
  
  const decryptData = async(encrypted,SECRET_KEY) => {
    const decrypted =await CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

  module.exports= {encryptData,decryptData};
